import type { Id } from 'node_modules/convex/dist/esm-types/values/value'
import { createContext, type ReactNode, useContext } from 'react'

export type GenerateUploadUrlFunc = () => Promise<string>
export type SaveFileFunc = (args: {
  name: string
  storageId: Id<'_storage'>
  type: string
  size: number
}) => Promise<unknown>
export type DeleteFileFunc = (args: {
  storageId: Id<'_storage'>
}) => Promise<unknown>

interface FileUploadContextState {
  generateUploadUrl: GenerateUploadUrlFunc
  saveFile: SaveFileFunc
  deleteFile: DeleteFileFunc
}

const FileUploadContext = createContext<FileUploadContextState | undefined>(
  undefined,
)

interface FileUploadProviderProps {
  children: ReactNode
  generateUploadUrl: GenerateUploadUrlFunc
  saveFile: SaveFileFunc
  deleteFile: DeleteFileFunc
}

export const FileUploadProvider = ({
  children,
  generateUploadUrl,
  saveFile,
  deleteFile,
}: FileUploadProviderProps) => {
  const value = {
    generateUploadUrl,
    saveFile,
    deleteFile,
  }

  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFileUploadActions = () => {
  const context = useContext(FileUploadContext)
  if (context === undefined) {
    throw new Error(
      'useFileUploadActions must be used within a FileUploadProvider',
    )
  }
  return context
}
