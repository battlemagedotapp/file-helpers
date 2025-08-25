import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { RotateCw, Upload, X } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import ReactCrop, { type Crop, type PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageData {
  id: string
  file: File
  url: string
  crop?: Crop
  rotation: number
}

interface ImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  files: File[]
  onUpload: (
    processedImages: {
      id: string
      file: File
      crop?: Crop
      rotation: number
    }[],
  ) => void
}

export function ImageCropDialog({
  open,
  onOpenChange,
  files,
  onUpload,
}: ImageCropDialogProps) {
  const [images, setImages] = useState<ImageData[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [crops, setCrops] = useState<Crop[]>([])
  const [rotations, setRotations] = useState<number[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  React.useEffect(() => {
    if (files.length > 0) {
      const newImages: ImageData[] = files.map((file, index) => ({
        id: `img-${index}`,
        file,
        url: URL.createObjectURL(file),
        rotation: 0,
      }))
      setImages(newImages)
      setCrops(new Array(files.length).fill(undefined))
      setRotations(new Array(files.length).fill(0))
      setSelectedImageIndex(0)
      imgRefs.current = new Array(files.length).fill(null)
    }
  }, [files])

  React.useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url)
      })
    }
  }, [images])

  const handleCropChange = useCallback(
    (crop: Crop, percentCrop: PercentCrop, index: number) => {
      setCrops((prev) => {
        const newCrops = [...prev]
        newCrops[index] = percentCrop
        return newCrops
      })
    },
    [],
  )

  const handleRotate = useCallback((index: number) => {
    setRotations((prev) => {
      const newRotations = [...prev]
      newRotations[index] = (newRotations[index] + 90) % 360
      return newRotations
    })
  }, [])

  const handleRemoveImage = useCallback(
    (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index))
      setCrops((prev) => prev.filter((_, i) => i !== index))
      setRotations((prev) => prev.filter((_, i) => i !== index))

      if (selectedImageIndex >= index && selectedImageIndex > 0) {
        setSelectedImageIndex((prev) => prev - 1)
      } else if (selectedImageIndex === index && index === images.length - 1) {
        setSelectedImageIndex((prev) => Math.max(0, prev - 1))
      }
    },
    [selectedImageIndex, images.length],
  )

  const handleUpload = useCallback(() => {
    const processedImages = images.map((image, index) => ({
      id: image.id,
      file: image.file,
      crop: crops[index],
      rotation: rotations[index],
    }))
    onUpload(processedImages)
    onOpenChange(false)
  }, [images, crops, rotations, onUpload, onOpenChange])

  const selectedImage = images[selectedImageIndex]
  const selectedCrop = crops[selectedImageIndex]
  const selectedRotation = rotations[selectedImageIndex]

  if (images.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Images</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden select-none">
          <div className="shrink-0 flex flex-row gap-2 h-24 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  'relative shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden',
                  selectedImageIndex === index
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50',
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="aspect-square h-full object-cover"
                  style={{
                    transform: `rotate(${rotations[index]}deg)`,
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Image {selectedImageIndex + 1} of {images.length}
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRotate(selectedImageIndex)}
              >
                <RotateCw className="h-4 w-4" />
                Rotate
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden bg-muted/20 rounded-lg">
              {selectedImage && (
                <ReactCrop
                  crop={selectedCrop}
                  onChange={(crop, percentCrop) =>
                    handleCropChange(crop, percentCrop, selectedImageIndex)
                  }
                  aspect={undefined}
                  minWidth={50}
                  minHeight={50}
                  keepSelection
                >
                  <img
                    ref={(el) => {
                      imgRefs.current[selectedImageIndex] = el
                    }}
                    src={selectedImage.url}
                    alt={`Selected image ${selectedImageIndex + 1}`}
                    className="max-h-[400px] max-w-full object-contain"
                    style={{
                      transform: `rotate(${selectedRotation}deg)`,
                    }}
                  />
                </ReactCrop>
              )}
            </div>
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
          <Button
            type="button"
            onClick={handleUpload}
            disabled={images.length === 0}
          >
            <Upload className="h-4 w-4" />
            Upload All ({images.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
