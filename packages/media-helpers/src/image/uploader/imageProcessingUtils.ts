import { type Crop } from 'react-image-crop'

export interface ProcessedImageData {
  id: string
  file: File
  crop?: Crop
  rotation: number
}

export function processImage(
  file: File,
  crop?: Crop,
  rotation: number = 0,
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
            (blob) => {
              if (blob) {
                const processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
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
            (blob) => {
              if (blob) {
                const processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
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
): Promise<File[]> {
  const processedFiles = await Promise.all(
    processedImages.map(({ file, crop, rotation }) =>
      processImage(file, crop, rotation),
    ),
  )
  return processedFiles
}
