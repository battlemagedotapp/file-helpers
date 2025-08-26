import { SingleAudioUploader } from '@battlemagedotapp/media-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z.object({
  audioA: z.string().min(1, 'Please select an audio file'),
})

export function AudioForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audioA: '',
    },
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
        <SingleAudioUploader
          file={form.watch('audioA')}
          setFile={(f: string) => form.setValue('audioA', f)}
          removeFile={() => form.setValue('audioA', '')}
          maxSizeInMB={50}
          allowedTypes={[
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/mp4',
            'audio/aac',
          ]}
          successMessage="Audio file uploaded successfully!"
          errorMessage="Failed to upload audio file"
          compact={false}
        />
        <Button className="w-fit" onClick={form.handleSubmit(handleFormSubmit)}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
