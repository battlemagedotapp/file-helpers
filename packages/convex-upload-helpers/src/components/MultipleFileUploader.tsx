import { useFileUpload } from '@/hooks/useFileUpload'
import type { Id } from 'node_modules/convex/dist/esm-types/values/value'
import React, { useRef, useState } from 'react'

type MultipleFileUploaderRenderProps = {
  isUploading: boolean
  fileFields: { id: string; value: string }[]
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  handleFileDelete: (index: number) => Promise<void>
  triggerFileSelect: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  maxFiles: number
  canAddMore: boolean
  remainingSlots: number
}

type MultipleFileUploaderProps = {
  fileFields: { id: string; value: string }[]
  appendFile: (f: { value: string }) => void
  removeFile: (index: number) => void
  maxFiles: number
  maxSizeInMB?: number
  allowedTypes?: string[]
  successMessage?: string
  errorMessage?: string
  children: (props: MultipleFileUploaderRenderProps) => React.ReactNode
}

export function MultipleFileUploader({
  fileFields,
  appendFile,
  removeFile,
  maxFiles,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = 'Files uploaded successfully!',
  errorMessage = 'Failed to upload files',
  children,
}: MultipleFileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { uploadFile, uploadMultipleFiles, deleteFile } = useFileUpload({
    maxSizeInMB,
    allowedTypes,
    successMessage,
    errorMessage,
  })

  const handleFileDelete = async (index: number) => {
    await deleteFile({ storageId: fileFields[index].value as Id<'_storage'> })
    removeFile(index)
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const remaining = Math.max(0, maxFiles - fileFields.length)

    if (remaining <= 0) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (filesArray.length > remaining) {
      filesArray.splice(remaining)
    }

    setIsUploading(true)
    try {
      if (filesArray.length === 1) {
        const storageId = await uploadFile(filesArray[0])
        appendFile({ value: storageId })
      } else {
        const storageIds = await uploadMultipleFiles(filesArray)
        storageIds.forEach((storageId) => appendFile({ value: storageId }))
      }
    } finally {
      setIsUploading(false)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const canAddMore = fileFields.length < maxFiles
  const remainingSlots = Math.max(0, maxFiles - fileFields.length)

  const renderProps: MultipleFileUploaderRenderProps = {
    isUploading,
    fileFields,
    handleFileChange,
    handleFileDelete,
    triggerFileSelect,
    fileInputRef,
    maxFiles,
    canAddMore,
    remainingSlots,
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      {children(renderProps)}
    </>
  )
}
