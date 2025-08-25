import {
  MultiImageCropUploader,
  MultiImageUploader,
  SingleImageCropUploader,
  SingleImageUploader,
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
  imageB: z.string().min(1, 'Please select an image'),
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
    <Form {...form}>
      <MultiImageCropUploader
        imageFields={imageFields}
        appendImage={appendImage}
        removeImage={removeImage}
        maxFiles={10}
        maxSizeInMB={10}
        allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
        successMessage="Image uploaded successfully!"
        errorMessage="Failed to upload image"
        compressionOptions={{
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }}
      />
      <MultiImageUploader
        imageFields={imageFields}
        appendImage={appendImage}
        removeImage={removeImage}
        maxFiles={10}
        maxSizeInMB={10}
        allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
        successMessage="Image uploaded successfully!"
        errorMessage="Failed to upload image"
      />
      <SingleImageUploader
        file={form.watch('imageB')}
        setFile={(f) => form.setValue('imageB', f)}
        removeFile={() => form.setValue('imageB', '')}
        maxSizeInMB={10}
        allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
        successMessage="Image uploaded successfully!"
        errorMessage="Failed to upload image"
        imageClassName="w-64 h-64 rounded-lg"
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
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }}
      />
      <Button className="w-fit" onClick={form.handleSubmit(handleFormSubmit)}>
        Submit
      </Button>
    </Form>
  )
}
