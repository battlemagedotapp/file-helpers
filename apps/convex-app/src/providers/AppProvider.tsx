import { GlobalPlayerProvider } from '@battlemagedotapp/media-helpers'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ThemeProvider } from 'react-theme-hook'
import FileUploadHookProvider from './FileUploadHookProvider'
import { ImageViewLibProvider } from './ImageViewLibProvider'
import ToastProvider from './ToastProvider'

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
if (!CONVEX_URL) {
  throw new Error('Add your Convex URL to the .env file')
}

const convex = new ConvexReactClient(CONVEX_URL)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConvexProvider client={convex}>
        <FileUploadHookProvider>
          <ImageViewLibProvider>
            <GlobalPlayerProvider
              externalAudioUrlFn={(storageId) => {
                return `${import.meta.env.VITE_CONVEX_SITE_URL}/getAudio?storageId=${storageId}`
              }}
            >
              {children}
              <ToastProvider />
            </GlobalPlayerProvider>
          </ImageViewLibProvider>
        </FileUploadHookProvider>
      </ConvexProvider>
    </ThemeProvider>
  )
}
