import { Ellipsis } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CropTestComponent } from './CropTestComponent'

type AudioPlaybackWithBlobProps = {
  src: string
  externalAudioUrlFn?: (url: string) => string
}

async function loadAudio(srcUrl: string) {
  const response = await fetch(srcUrl)
  const blob = await response.blob()
  return [URL.createObjectURL(blob), blob] as const
}

export function CropTestComponentWithBlob({
  src,
  externalAudioUrlFn,
}: AudioPlaybackWithBlobProps) {
  const srcUrl = useMemo(
    () => (externalAudioUrlFn ? externalAudioUrlFn(src) : src),
    [externalAudioUrlFn, src],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl)
    }
    loadAudio(srcUrl)
      .then((res) => {
        setAudioBlobUrl(res[0])
        setAudioBlob(res[1])
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcUrl])

  useEffect(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl)
      }
    }
  }, [audioBlobUrl])

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center">
        <Ellipsis className="h-4 w-4 animate-pulse" />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (audioBlob && audioBlobUrl) {
    return <CropTestComponent src={{ mode: 'blob', blob: audioBlob }} />
  }
  return <div>No audio source found</div>
}
