import { MultiImageUploader as MultiImageUploaderHelper } from '@battlemagedotapp/media-helpers/image'
import { zodResolver } from '@hookform/resolvers/zod'
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
      <MultiImageUploaderHelper
        imageFields={imageFields}
        appendImage={appendImage}
        removeImage={removeImage}
        maxFiles={10}
        maxSizeInMB={10}
        allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
        successMessage="Image uploaded successfully!"
        errorMessage="Failed to upload image"
      />
      <Button className="w-fit" onClick={form.handleSubmit(handleFormSubmit)}>
        Submit
      </Button>
    </Form>
  )
}
