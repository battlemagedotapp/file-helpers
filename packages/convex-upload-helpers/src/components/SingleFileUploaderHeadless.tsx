import { useFileUpload } from '@/hooks/useFileUpload'
import type { Id } from 'node_modules/convex/dist/esm-types/values/value'
import React, { useRef, useState } from 'react'

type SingleFileUploaderHeadlessRenderProps = {
  isUploading: boolean
  file?: string | null
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  handleFileDelete: () => Promise<void>
  triggerFileSelect: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  hasFile: boolean
}

type SingleFileUploaderHeadlessProps = {
  file?: string | null
  setFile: (f: string) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  children: (props: SingleFileUploaderHeadlessRenderProps) => React.ReactNode
}

export function SingleFileUploaderHeadless({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'File uploaded successfully!',
  errorMessage = 'Failed to upload file',
  children,
}: SingleFileUploaderHeadlessProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { uploadFile, deleteFile } = useFileUpload({
    maxSizeInMB,
    allowedTypes,
    successMessage,
    errorMessage,
  })

  const handleFileDelete = async () => {
    if (!file) return
    await deleteFile({ storageId: file as Id<'_storage'> })
    removeFile()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const pickedFile = files[0]

    setIsUploading(true)
    try {
      const storageId = await uploadFile(pickedFile)
      setFile(storageId)
    } finally {
      setIsUploading(false)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const hasFile = Boolean(file)

  const renderProps: SingleFileUploaderHeadlessRenderProps = {
    isUploading,
    file,
    handleFileChange,
    handleFileDelete,
    triggerFileSelect,
    fileInputRef,
    hasFile,
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept={allowedTypes.join(',')}
      />
      {children(renderProps)}
    </>
  )
}
