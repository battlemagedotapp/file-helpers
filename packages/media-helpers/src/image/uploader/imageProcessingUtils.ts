import imageCompression from 'browser-image-compression'
import { type Crop } from 'react-image-crop'

export interface ProcessedImageData {
  id: string
  file: File
  crop?: Crop
  rotation: number
}

export interface CompressionOptions {
  maxSizeMB: number
  maxWidthOrHeight: number
  useWebWorker?: boolean
  onProgress?: (progress: number) => void
  preserveExif?: boolean
  signal?: AbortSignal
  maxIteration?: number
  exifOrientation?: number
  fileType?: string
  initialQuality?: number
  alwaysKeepResolution?: boolean
}

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/bmp',
]

export function isImageTypeSupported(fileType: string): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(fileType.toLowerCase())
}

export async function compressImage(
  file: File,
  options: CompressionOptions,
): Promise<File> {
  if (!isImageTypeSupported(file.type)) {
    console.log(
      `Skipping compression for ${file.name} (${file.type}) - type not supported`,
    )
    return file
  }

  try {
    console.log(`Compressing ${file.name} (${file.type})`)
    const compressedFile = await imageCompression(file, options)
    console.log(`Successfully compressed ${file.name}`)
    return compressedFile
  } catch (error) {
    console.warn(
      `Failed to compress ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
    return file
  }
}

export function processImage(
  file: File,
  crop?: Crop,
  rotation: number = 0,
  compressionOptions?: CompressionOptions,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        const rotatedWidth = rotation % 180 === 0 ? img.width : img.height
        const rotatedHeight = rotation % 180 === 0 ? img.height : img.width

        canvas.width = rotatedWidth
        canvas.height = rotatedHeight

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(img, -img.width / 2, -img.height / 2)

        if (crop && crop.width > 0 && crop.height > 0) {
          const cropCanvas = document.createElement('canvas')
          const cropCtx = cropCanvas.getContext('2d')

          if (!cropCtx) {
            reject(new Error('Could not get crop canvas context'))
            return
          }

          const cropX = (crop.x * rotatedWidth) / 100
          const cropY = (crop.y * rotatedHeight) / 100
          const cropWidth = (crop.width * rotatedWidth) / 100
          const cropHeight = (crop.height * rotatedHeight) / 100

          cropCanvas.width = cropWidth
          cropCanvas.height = cropHeight

          cropCtx.drawImage(
            canvas,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight,
          )

          cropCanvas.toBlob(
            async (blob) => {
              if (blob) {
                let processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })

                if (compressionOptions) {
                  processedFile = await compressImage(
                    processedFile,
                    compressionOptions,
                  )
                }

                resolve(processedFile)
              } else {
                reject(new Error('Failed to create blob'))
              }
            },
            file.type,
            0.9,
          )
        } else {
          canvas.toBlob(
            async (blob) => {
              if (blob) {
                let processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })

                if (compressionOptions) {
                  processedFile = await compressImage(
                    processedFile,
                    compressionOptions,
                  )
                }

                resolve(processedFile)
              } else {
                reject(new Error('Failed to create blob'))
              }
            },
            file.type,
            0.9,
          )
        }
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

export async function processImages(
  processedImages: ProcessedImageData[],
  compressionOptions?: CompressionOptions,
): Promise<File[]> {
  const processedFiles = await Promise.all(
    processedImages.map(({ file, crop, rotation }) =>
      processImage(file, crop, rotation, compressionOptions),
    ),
  )
  return processedFiles
}
