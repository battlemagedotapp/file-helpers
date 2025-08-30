import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { AudioTrimPlaybackWithBlob } from './AudioTrimPlaybackWithBlob'

type AudioTrimDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: File
  onUpload: (processedAudio: {
    id: string
    file: File
    trimRegion?: { start: number; end: number }
  }) => void
}

export function AudioTrimDialog({
  open,
  onOpenChange,
  file,
  onUpload,
}: AudioTrimDialogProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [trimmedBlob, setTrimmedBlob] = useState<Blob | null>(null)
  const [trimRegion, setTrimRegion] = useState<{
    start: number
    end: number
  } | null>(null)
  const [isTrimMode, setIsTrimMode] = useState(false)

  const handleTrim = (regionTimestamps: { start: number; end: number }) => {
    setTrimRegion(regionTimestamps)
    // The AudioTrimPlaybackWithBlob will handle the actual trimming and set the trimmed blob
  }

  const handleTrimModeChange = (trimMode: boolean) => {
    setIsTrimMode(trimMode)
  }

  const handleUpload = async () => {
    if (!trimmedBlob) {
      // If no trimming was done, use the original file
      onUpload({
        id: crypto.randomUUID(),
        file: file,
      })
      return
    }

    try {
      setIsUploading(true)

      // Convert blob to file
      const trimmedFile = new File([trimmedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })

      onUpload({
        id: crypto.randomUUID(),
        file: trimmedFile,
        trimRegion: trimRegion || undefined,
      })
    } catch (error) {
      console.error('Error processing audio:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when dialog closes
      setTrimmedBlob(null)
      setTrimRegion(null)
      setIsTrimMode(false)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trim Audio</DialogTitle>
          <DialogDescription>
            Select a region to trim your audio file. You can drag to select a
            region and then confirm the trim.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 w-full">
          <AudioTrimPlaybackWithBlob
            src={URL.createObjectURL(file)}
            onTrim={handleTrim}
            onTrimmedBlobChange={setTrimmedBlob}
            onTrimModeChange={handleTrimModeChange}
          />
        </div>

        {!isTrimMode && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Audio'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
