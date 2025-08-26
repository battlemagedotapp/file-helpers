import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RotateCw, Upload } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import ReactCrop, { type Crop, type PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface SingleImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: File
  onUpload: (processedImage: {
    id: string
    file: File
    crop?: Crop
    rotation: number
  }) => void
}

export function SingleImageCropDialog({
  open,
  onOpenChange,
  file,
  onUpload,
}: SingleImageCropDialogProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [rotatedImageUrl, setRotatedImageUrl] = useState<string>('')
  const [crop, setCrop] = useState<Crop>()
  const [rotation, setRotation] = useState<number>(0)
  const imgRef = useRef<HTMLImageElement | null>(null)

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [file])

  const createRotatedImage = useCallback(
    (imageUrl: string, rotation: number): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!

          const isVertical = rotation % 180 === 90
          const width = isVertical ? img.height : img.width
          const height = isVertical ? img.width : img.height

          canvas.width = width
          canvas.height = height

          ctx.translate(width / 2, height / 2)
          ctx.rotate((rotation * Math.PI) / 180)
          ctx.drawImage(img, -img.width / 2, -img.height / 2)

          const rotatedUrl = canvas.toDataURL('image/jpeg', 0.9)
          resolve(rotatedUrl)
        }
        img.src = imageUrl
      })
    },
    [],
  )

  React.useEffect(() => {
    if (imageUrl) {
      createRotatedImage(imageUrl, rotation).then(setRotatedImageUrl)
    }
  }, [imageUrl, rotation, createRotatedImage])

  const handleCropChange = useCallback(
    (newCrop: Crop, percentCrop: PercentCrop) => {
      setCrop(percentCrop)
    },
    [],
  )

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360)
  }, [])

  const handleUnselectCrop = useCallback(() => {
    setCrop(undefined)
  }, [])

  const handleUpload = useCallback(() => {
    const processedImage = {
      id: `img-0`,
      file: file,
      crop: crop,
      rotation: rotation,
    }
    onUpload(processedImage)
    onOpenChange(false)
  }, [file, crop, rotation, onUpload, onOpenChange])

  if (!file) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden select-none">
          <div className="flex items-center justify-start">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUnselectCrop}
                disabled={!crop}
              >
                Unselect
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
                Rotate
              </Button>
            </div>
          </div>

          <div
            style={{
              height: '100%',
              overflow: 'scroll',
            }}
          >
            {rotatedImageUrl && (
              <ReactCrop
                crop={crop}
                onChange={handleCropChange}
                aspect={undefined}
                minWidth={5}
                minHeight={5}
                keepSelection
              >
                <img
                  ref={imgRef}
                  src={rotatedImageUrl}
                  alt="Image to crop"
                  className="h-full w-auto object-contain"
                />
              </ReactCrop>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleUpload}>
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
