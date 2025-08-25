import { Button } from '@/components/ui/button'
import { ImageView } from '@/image/view/ImageView'
import { cn } from '@/lib/utils'
import { useFileUpload } from '@battlemagedotapp/convex-upload-helpers'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import ConfirmAlertDialog from './ConfirmAlertDialog'
import { ImageCropDialog } from './ImageCropDialog'
import { processImages, type ProcessedImageData } from './imageProcessingUtils'

type MultiImageCropUploaderProps = {
  imageFields: { id: string; value: string }[]
  appendImage: (f: { value: string }) => void
  removeImage: (index: number) => void
  maxFiles: number
  maxSizeInMB: number
  allowedTypes: string[]
  successMessage: string
  errorMessage: string
  previewImageListClassName?: string
  previewImageItemClassName?: string
}

export function MultiImageCropUploader({
  imageFields,
  appendImage,
  removeImage,
  maxFiles,
  maxSizeInMB,
  allowedTypes,
  successMessage,
  errorMessage,
  previewImageListClassName,
  previewImageItemClassName,
}: MultiImageCropUploaderProps) {
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { uploadFile, deleteFile } = useFileUpload({
    maxSizeInMB,
    allowedTypes,
    successMessage,
    errorMessage,
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const remaining = Math.max(0, maxFiles - imageFields.length)

    if (remaining <= 0) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (filesArray.length > remaining) {
      filesArray.splice(remaining)
    }

    setPendingFiles(filesArray)
    setCropDialogOpen(true)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCropDialogUpload = async (
    processedImages: ProcessedImageData[],
  ) => {
    try {
      setIsUploading(true)
      const processedFiles = await processImages(processedImages)

      for (const file of processedFiles) {
        const storageId = await uploadFile(file)
        appendImage({ value: storageId })
      }
    } catch (error) {
      console.error('Error processing images:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileDelete = async (index: number) => {
    try {
      const storageId = imageFields[index].value
      if (storageId && !storageId.startsWith('data:')) {
        await deleteFile({ storageId: storageId })
      }
      removeImage(index)
    } catch (error) {
      console.error('Error deleting file:', error)
      removeImage(index)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const canAddMore = imageFields.length < maxFiles

  return (
    <>
      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept={allowedTypes.join(',')}
        />
        <Button
          disabled={isUploading || !canAddMore}
          variant="default"
          size="default"
          className="w-fit"
          onClick={triggerFileSelect}
        >
          {isUploading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {isUploading ? 'Uploading...' : 'Add image(s)'}
        </Button>
        <p className="text-sm text-muted-foreground">
          Maximum {maxFiles} images allowed
        </p>
        {imageFields.length > 0 && (
          <div
            className={cn(
              'flex flex-row flex-nowrap h-64 overflow-x-scroll show-scrollbar',
              previewImageListClassName,
            )}
          >
            {imageFields.map((field, index) => (
              <div
                key={field.id}
                className="shrink-0 h-full relative aspect-square p-4"
              >
                <ImageView
                  src={field.value}
                  alt={`Image ${index + 1}`}
                  className={cn(
                    'rounded-lg overflow-hidden',
                    previewImageItemClassName,
                  )}
                />
                <div className="absolute top-2 right-2">
                  <ConfirmAlertDialog
                    trigger={
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    }
                    title="Delete image"
                    description="Are you sure you want to delete this image? This action cannot be undone."
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={() => handleFileDelete(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        files={pendingFiles}
        onUpload={handleCropDialogUpload}
      />
    </>
  )
}
