import { Button } from '@/components/ui/button'
import { ImageView } from '@/image/view/ImageView'
import { MultipleFileUploaderHeadless } from '@battlemagedotapp/convex-upload-helpers'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import ConfirmAlertDialog from './ConfirmAlertDialog'

type MultiImageUploaderProps = {
  imageFields: { id: string; value: string }[]
  appendImage: (f: { value: string }) => void
  removeImage: (index: number) => void
  maxFiles: number
  maxSizeInMB: number
  allowedTypes: string[]
  successMessage: string
  errorMessage: string
}

export function MultiImageUploader({
  imageFields,
  appendImage,
  removeImage,
  maxFiles,
  maxSizeInMB,
  allowedTypes,
  successMessage,
  errorMessage,
}: MultiImageUploaderProps) {
  return (
    <MultipleFileUploaderHeadless
      fileFields={imageFields}
      appendFile={appendImage}
      removeFile={removeImage}
      maxFiles={maxFiles}
      maxSizeInMB={maxSizeInMB}
      allowedTypes={allowedTypes}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      {({ isUploading, triggerFileSelect, handleFileDelete, canAddMore }) => (
        <div className="flex flex-col gap-2">
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
            <div className="flex flex-row flex-nowrap w-full h-48 overflow-x-scroll show-scrollbar">
              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="shrink-0 w-56 h-full relative p-4"
                >
                  <div className="rounded-lg overflow-hidden w-full h-full">
                    <ImageView src={field.value} alt={`Image ${index + 1}`} />
                  </div>
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
      )}
    </MultipleFileUploaderHeadless>
  )
}
