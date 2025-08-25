import { ImageViewProvider } from '@battlemagedotapp/media-helpers/image'

export function ImageViewLibProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const transformImageUrl = (storageId: string) => {
    return `${import.meta.env.VITE_CONVEX_SITE_URL}/getImage?storageId=${storageId}`
  }
  return (
    <ImageViewProvider transformImageUrlFn={transformImageUrl}>
      {children}
    </ImageViewProvider>
  )
}
