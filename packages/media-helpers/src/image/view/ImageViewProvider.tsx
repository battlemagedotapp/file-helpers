import ImageViewContext, {
  type TransformImageUrlFn,
} from '@/image/view/ImageViewProviderContext'
import React from 'react'

type ImageViewProviderProps = {
  transformImageUrlFn?: TransformImageUrlFn
  children: React.ReactNode
}

export function ImageViewProvider({
  transformImageUrlFn,
  children,
}: ImageViewProviderProps) {
  const fn = transformImageUrlFn ?? ((id: string) => id)
  return (
    <ImageViewContext.Provider value={{ transformImageUrlFn: fn }}>
      {children}
    </ImageViewContext.Provider>
  )
}

export default ImageViewProvider
