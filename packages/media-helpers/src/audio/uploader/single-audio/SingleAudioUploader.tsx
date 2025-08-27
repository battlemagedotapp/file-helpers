import { AudioPlaybackWithBlob } from '@/audio/playback/AudioPlaybackWithBlob'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SingleFileUploaderHeadless } from '@battlemagedotapp/convex-upload-helpers'
import { LoaderCircle, Music, Trash } from 'lucide-react'
import ConfirmAlertDialog from '../ConfirmAlertDialog'

type SingleAudioUploaderProps = {
  file?: string | null
  setFile: (f: string) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  className?: string
  compact?: boolean
}

export function SingleAudioUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'Audio file uploaded successfully!',
  errorMessage = 'Failed to upload audio file',
  className,
  compact = false,
}: SingleAudioUploaderProps) {
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
                <Music className="h-4 w-4" />
              )}
              {isUploading ? 'Uploading...' : 'Add audio'}
            </Button>
          )}

          {file && (
            <div
              className="relative p-4 w-full"
              style={{ minWidth: compact ? '332px' : '432px', flexShrink: 0 }}
            >
              <AudioPlaybackWithBlob src={file} />
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
                  title="Delete audio"
                  description="Are you sure you want to delete this audio file? This action cannot be undone."
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

export default SingleAudioUploader
