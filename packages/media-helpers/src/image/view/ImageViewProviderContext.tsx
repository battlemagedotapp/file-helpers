import { createContext, useContext } from 'react'

export type TransformImageUrlFn = (storageId: string) => string

const defaultTransform: TransformImageUrlFn = (storageId: string) => storageId

const ImageViewContext = createContext<{
  transformImageUrlFn: TransformImageUrlFn
}>({
  transformImageUrlFn: defaultTransform,
})

export const useImageView = () => useContext(ImageViewContext)

export default ImageViewContext
