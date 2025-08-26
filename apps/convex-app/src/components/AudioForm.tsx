import { SingleAudioUploader } from '@battlemagedotapp/media-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z.object({
  audioA: z.string().min(1, 'Please select an audio file'),
  audioB: z.string().min(1, 'Please select an audio file'),
})

export function AudioForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audioA: '',
      audioB: '',
    },
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const audioA = form.watch('audioA')
  const audioB = form.watch('audioB')

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <SingleAudioUploader
          file={audioA}
          setFile={(f: string) => form.setValue('audioA', f)}
          removeFile={() => form.setValue('audioA', '')}
          maxSizeInMB={15}
          allowedTypes={[
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/mp4',
            'audio/aac',
          ]}
          successMessage="Audio file uploaded successfully!"
          errorMessage="Failed to upload audio file"
          compact={true}
        />

        <div className="flex justify-center mt-6">
          <Button
            className="w-fit"
            onClick={form.handleSubmit(handleFormSubmit)}
            disabled={!audioA || !audioB}
          >
            Submit Audio Files
          </Button>
        </div>
      </Form>
    </div>
  )
}
