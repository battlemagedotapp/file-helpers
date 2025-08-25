import { MultipleFileUploader } from '@battlemagedotapp/convex-upload-helpers'
import { ImageView } from '@battlemagedotapp/media-helpers/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, LoaderCircle, Trash } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form } from './ui/form'

const imageFieldSchema = z.object({
  value: z.string().min(1, 'Please select an image'),
})

const formSchema = z.object({
  images: z.array(imageFieldSchema).min(1, 'Please select at least one image'),
})

export function MultiImageUploader() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: 'images',
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
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
      <Button className="w-fit" onClick={form.handleSubmit(handleFormSubmit)}>
        Submit
      </Button>
    </Form>
  )
}
