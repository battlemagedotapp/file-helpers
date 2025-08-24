import { useTheme } from 'react-theme-hook'
import { Toaster } from 'sonner'

export default function ToastProvider() {
  const { theme } = useTheme()
  return (
    <Toaster
      position="top-center"
      theme={theme}
      expand={true}
      richColors
      toastOptions={{
        style: {
          boxShadow: 'none',
        },
      }}
    />
  )
}
