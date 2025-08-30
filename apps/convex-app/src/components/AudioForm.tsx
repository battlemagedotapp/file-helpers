import {
  AudioTrimUploader,
  SingleAudioUploader,
} from '@battlemagedotapp/media-helpers/audio'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z.object({
  audio: z.string().min(1, 'Please select an audio file'),
  audioTrim: z.string().min(1, 'Please select a trimmed audio file'),
})

export function AudioForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audio: '',
      audioTrim: '',
    },
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const audio = form.watch('audio')
  const audioTrim = form.watch('audioTrim')
  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <SingleAudioUploader
          externalAudioUrlFn={(storageId) => {
            return `${import.meta.env.VITE_CONVEX_SITE_URL}/getAudio?storageId=${storageId}`
          }}
          file={audio}
          setFile={(f: string) => form.setValue('audio', f)}
          removeFile={() => form.setValue('audio', '')}
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
        />

        <AudioTrimUploader
          externalAudioUrlFn={(storageId) => {
            return `${import.meta.env.VITE_CONVEX_SITE_URL}/getAudio?storageId=${storageId}`
          }}
          file={audioTrim}
          setFile={(f: string) => form.setValue('audioTrim', f)}
          removeFile={() => form.setValue('audioTrim', '')}
          maxSizeInMB={15}
          allowedTypes={[
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/mp4',
            'audio/aac',
          ]}
          successMessage="Audio file trimmed and uploaded successfully!"
          errorMessage="Failed to upload audio file"
        />

        <Button
          className="w-fit"
          onClick={form.handleSubmit(handleFormSubmit)}
          disabled={!audio || !audioTrim}
        >
          Submit Audio
        </Button>
      </Form>
    </div>
  )
}
