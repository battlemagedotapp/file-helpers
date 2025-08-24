import { useFileUpload } from '@/hooks/useFileUpload'
import type { Id } from 'node_modules/convex/dist/esm-types/values/value'
import React, { useRef, useState } from 'react'

type SingleFileUploaderRenderProps = {
  isUploading: boolean
  file?: { id: string; value: string } | null
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  handleFileDelete: () => Promise<void>
  triggerFileSelect: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  hasFile: boolean
}

type SingleFileUploaderProps = {
  file?: { id: string; value: string } | null
  setFile: (f: { value: string }) => void
  removeFile: () => void
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  children: (props: SingleFileUploaderRenderProps) => React.ReactNode
}

export function SingleFileUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'File uploaded successfully!',
  errorMessage = 'Failed to upload file',
  children,
}: SingleFileUploaderProps) {
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
    await deleteFile({ storageId: file.value as Id<'_storage'> })
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
      setFile({ value: storageId })
    } finally {
      setIsUploading(false)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const hasFile = Boolean(file)

  const renderProps: SingleFileUploaderRenderProps = {
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
      />
      {children(renderProps)}
    </>
  )
}
