import { Button } from '@/components/ui/button'
import { ImageView } from '@/image/view/ImageView'
import { cn } from '@/lib/utils'
import { SingleFileUploaderHeadless } from '@battlemagedotapp/convex-upload-helpers'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import ConfirmAlertDialog from '../ConfirmAlertDialog'

type SingleImageUploaderProps = {
  file?: string | null
  setFile: (f: string) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  className?: string
  imageClassName?: string
}

export function SingleImageUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'File uploaded successfully!',
  errorMessage = 'Failed to upload file',
  className,
  imageClassName,
}: SingleImageUploaderProps) {
  return (
    <SingleFileUploaderHeadless
      file={file}
      setFile={setFile}
      removeFile={removeFile}
      maxSizeInMB={maxSizeInMB}
      allowedTypes={allowedTypes}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      {({ isUploading, triggerFileSelect, handleFileDelete, hasFile }) => (
        <div className={cn('relative', className)}>
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
      )}
    </SingleFileUploaderHeadless>
  )
}

export default SingleImageUploader
