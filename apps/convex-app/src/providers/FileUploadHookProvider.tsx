import { api } from '@/convex/_generated/api'
import { FileUploadProvider } from '@battlemagedotapp/convex-upload-helpers'
import { useMutation } from 'convex/react'

export default function FileUploadHookProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl)
  const saveFile = useMutation(api.functions.files.saveFile)
  const deleteFile = useMutation(api.functions.files.deleteFile)

  return (
    <FileUploadProvider
      generateUploadUrl={generateUploadUrl}
      saveFile={saveFile}
      deleteFile={deleteFile}
    >
      {children}
    </FileUploadProvider>
  )
}
