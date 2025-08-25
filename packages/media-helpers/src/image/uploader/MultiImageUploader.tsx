import { Button } from '@/components/ui/button'
import { MultipleFileUploader } from '@battlemagedotapp/convex-upload-helpers'
import { ImageView } from '@battlemagedotapp/media-helpers/image'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from 'react-hook-form'

type MultiImageUploaderProps = {
  imageFields: FieldArrayWithId<
    {
      images: {
        value: string
      }[]
    },
    'images',
    'id'
  >[]
  appendImage: UseFieldArrayAppend<
    {
      images: {
        value: string
      }[]
    },
    'images'
  >
  removeImage: UseFieldArrayRemove
}

export function MultiImageUploader({
  imageFields,
  appendImage,
  removeImage,
}: MultiImageUploaderProps) {
  return (
    <MultipleFileUploader
      fileFields={imageFields}
      appendFile={appendImage}
      removeFile={removeImage}
      maxFiles={10}
      maxSizeInMB={10}
      allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
      successMessage="Image uploaded successfully!"
      errorMessage="Failed to upload image"
    >
      {({ isUploading, triggerFileSelect, handleFileDelete, canAddMore }) => (
        <div className="flex flex-col gap-2">
          <Button
            disabled={isUploading || !canAddMore}
            variant="default"
            size="default"
            className="w-fit"
            onClick={triggerFileSelect}
          >
            {isUploading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {isUploading ? 'Uploading...' : 'Add image(s)'}
          </Button>
          <p className="text-sm text-muted-foreground">
            Maximum 10 images allowed
          </p>
          {imageFields.length > 0 && (
            <div className="flex flex-row flex-nowrap gap-4 w-full h-48 overflow-x-scroll show-scrollbar">
              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="shrink-0 w-56 h-full rounded-lg overflow-hidden relative"
                >
                  <ImageView src={field.value} alt={`Image ${index + 1}`} />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => handleFileDelete(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </MultipleFileUploader>
  )
}
