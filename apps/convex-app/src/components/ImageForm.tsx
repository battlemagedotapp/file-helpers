import {
  MultiImageCropUploader,
  SingleImageCropUploader,
} from '@battlemagedotapp/media-helpers/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './ui/button'
import { Form } from './ui/form'

const imageFieldSchema = z.object({
  value: z.string().min(1, 'Please select an image'),
})

const formSchema = z.object({
  imagesA: z.array(imageFieldSchema).min(1, 'Please select at least one image'),
  imageC: z.string().min(1, 'Please select an image'),
})

export function ImageForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imagesA: [],
    },
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: 'imagesA',
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <MultiImageCropUploader
          imageFields={imageFields}
          appendImage={appendImage}
          removeImage={removeImage}
          maxFiles={10}
          maxSizeInMB={10}
          allowedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
          successMessage="Image uploaded successfully!"
          errorMessage="Failed to upload image"
          compressionOptions={{
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }}
        />
        <SingleImageCropUploader
          file={form.watch('imageC')}
          setFile={(f) => form.setValue('imageC', f)}
          removeFile={() => form.setValue('imageC', '')}
          maxSizeInMB={10}
          allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
          successMessage="Image uploaded successfully!"
          errorMessage="Failed to upload image"
          imageClassName="w-64 h-64 rounded-lg"
          compressionOptions={{
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }}
        />
        <Button className="w-fit" onClick={form.handleSubmit(handleFormSubmit)}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
