const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL

export const transformImageUrlFn = (storageId: string) => {
  if (!convexSiteUrl) {
    return undefined
  }
  return `${convexSiteUrl}/getImage?storageId=${storageId}`
}
