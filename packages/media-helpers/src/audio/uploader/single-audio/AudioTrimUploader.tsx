import { AudioPlaybackWithBlob } from '@/audio/playback/AudioPlaybackWithBlob'
import { useGlobalPlayer } from '@/audio/playback/useGlobalPlayer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFileUpload } from '@battlemagedotapp/convex-upload-helpers'
import { ExternalLink, LoaderCircle, Music, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import ConfirmAlertDialog from '../ConfirmAlertDialog'
import { AudioTrimDialog } from './AudioTrimDialog'

type AudioTrimUploaderProps = {
  file?: string | null
  setFile: (f: string) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  className?: string
  externalAudioUrlFn?: (url: string) => string
}

export function AudioTrimUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'Audio file uploaded successfully!',
  errorMessage = 'Failed to upload audio file',
  className,
  externalAudioUrlFn,
}: AudioTrimUploaderProps) {
  const [trimDialogOpen, setTrimDialogOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToGlobalPlayer } = useGlobalPlayer()

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
    setTrimDialogOpen(true)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleTrimDialogUpload = async (processedAudio: {
    id: string
    file: File
    trimRegion?: { start: number; end: number }
  }) => {
    try {
      setIsUploading(true)
      setTrimDialogOpen(false) // Close dialog immediately when upload starts

      const storageId = await uploadFile(processedAudio.file)
      setFile(storageId)
    } catch (error) {
      console.error('Error uploading audio:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload audio',
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
            type="button"
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
          <div className="relative p-4 w-full min-w-[332px] flex flex-col items-center gap-2">
            <AudioPlaybackWithBlob
              src={file}
              externalAudioUrlFn={externalAudioUrlFn}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => addToGlobalPlayer(file, 'Trimmed Audio')}
              title="Open in global player"
            >
              <ExternalLink className="h-4 w-4" />
              Open in player
            </Button>
            <div className="absolute top-0 right-0 flex gap-1">
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

      {pendingFile && (
        <AudioTrimDialog
          open={trimDialogOpen}
          onOpenChange={setTrimDialogOpen}
          file={pendingFile}
          onUpload={handleTrimDialogUpload}
        />
      )}
    </>
  )
}

export default AudioTrimUploader
