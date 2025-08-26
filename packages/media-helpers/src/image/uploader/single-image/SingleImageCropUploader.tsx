import { Button } from '@/components/ui/button'
import { ImageView } from '@/image/view/ImageView'
import { cn } from '@/lib/utils'
import { useFileUpload } from '@battlemagedotapp/convex-upload-helpers'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import ConfirmAlertDialog from '../ConfirmAlertDialog'
import { processImage, type CompressionOptions } from '../imageProcessingUtils'
import { SingleImageCropDialog } from './SingleImageCropDialog'

type SingleImageCropUploaderProps = {
  file?: string | null
  setFile: (f: string) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  className?: string
  imageClassName?: string
  compressionOptions?: CompressionOptions
}

export function SingleImageCropUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'File uploaded successfully!',
  errorMessage = 'Failed to upload file',
  className,
  imageClassName,
  compressionOptions,
}: SingleImageCropUploaderProps) {
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
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
    const selectedFile = filesArray[0]

    setPendingFile(selectedFile)
    setCropDialogOpen(true)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCropDialogUpload = async (processedImage: {
    id: string
    file: File
    crop?: import('react-image-crop').Crop
    rotation: number
  }) => {
    try {
      setIsUploading(true)

      const processedFile = await processImage(
        processedImage.file,
        processedImage.crop,
        processedImage.rotation,
        compressionOptions,
      )

      const storageId = await uploadFile(processedFile)
      setFile(storageId)
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to process image',
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileDelete = async () => {
    try {
      if (file && !file.startsWith('data:')) {
        await deleteFile({ storageId: file })
      }
      removeFile()
    } catch (error) {
      console.error('Error deleting file:', error)
      removeFile()
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const hasFile = !!file

  return (
    <>
      <div className={cn('relative', className)}>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept={allowedTypes.join(',')}
        />

        {!hasFile && (
          <Button
            disabled={isUploading}
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
            {isUploading ? 'Uploading...' : 'Add image'}
          </Button>
        )}

        {file && (
          <div className="relative p-4 w-fit">
            <ImageView
              src={file}
              alt="Uploaded image"
              className={cn('rounded-lg overflow-hidden', imageClassName)}
            />
            <div className="absolute top-0 right-0">
              <ConfirmAlertDialog
                trigger={(props) => (
                  <Button
                    {...props}
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
                title="Delete image"
                description="Are you sure you want to delete this image? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleFileDelete}
              />
            </div>
          </div>
        )}
      </div>

      {pendingFile && (
        <SingleImageCropDialog
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          file={pendingFile}
          onUpload={handleCropDialogUpload}
        />
      )}
    </>
  )
}

export default SingleImageCropUploader
