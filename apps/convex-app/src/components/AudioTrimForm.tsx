import { AudioTrimUploader } from '@battlemagedotapp/media-helpers/audio'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z.object({
  audioTrim: z.string().min(1, 'Please select an audio file'),
})

export function AudioTrimForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audioTrim: '',
    },
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const audioTrim = form.watch('audioTrim')

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Audio Trim Uploader</h2>
      <p className="text-muted-foreground">
        Select an audio file to trim and upload. You can select a region to trim
        before uploading.
      </p>

      <Form {...form}>
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

        <div className="flex justify-center mt-6">
          <Button
            className="w-fit"
            onClick={form.handleSubmit(handleFormSubmit)}
            disabled={!audioTrim}
          >
            Submit Trimmed Audio
          </Button>
        </div>
      </Form>
    </div>
  )
}
