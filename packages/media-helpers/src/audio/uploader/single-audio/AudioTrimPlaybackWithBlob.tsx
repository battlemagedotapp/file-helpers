import { Ellipsis } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { AudioTrimPlayback } from './AudioTrimPlayback'

type AudioTrimPlaybackWithBlobProps = {
  src: string
  externalAudioUrlFn?: (url: string) => string
  onTrim?: (regionTimestamps: { start: number; end: number }) => void
  onTrimmedBlobChange?: (blob: Blob | null) => void
}

// Load audio as both blob and AudioBuffer
async function loadAudio(srcUrl: string) {
  const response = await fetch(srcUrl)
  const arrayBuffer = await response.arrayBuffer()
  const blob = new Blob([arrayBuffer])

  // Decode to AudioBuffer
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  return {
    blobUrl: URL.createObjectURL(blob),
    blob: blob,
    audioBuffer: audioBuffer,
  }
}

// Utility function to convert AudioBuffer to blob (preserving original quality)
function audioBufferToBlob(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = audioBuffer.numberOfChannels
  const length = audioBuffer.length
  const sampleRate = audioBuffer.sampleRate
  const bytesPerSample = 2 // 16-bit PCM
  const blockAlign = numberOfChannels * bytesPerSample
  const byteRate = sampleRate * blockAlign
  const dataSize = length * blockAlign
  const bufferSize = 44 + dataSize

  const arrayBuffer = new ArrayBuffer(bufferSize)
  const view = new DataView(arrayBuffer)

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, bufferSize - 8, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true) // Sub-chunk size
  view.setUint16(20, 1, true) // Audio format (PCM)
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, 16, true) // Bits per sample
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)

  // Write audio data - preserve original quality by directly copying from AudioBuffer
  let offset = 44
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel)
      // Convert float32 to 16-bit PCM without any additional processing
      const sample = Math.max(-1, Math.min(1, channelData[i])) // Clamp to [-1, 1]
      const pcmSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff
      view.setInt16(offset, pcmSample, true)
      offset += 2
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' })
}

export function AudioTrimPlaybackWithBlob({
  src,
  externalAudioUrlFn,
  onTrim,
  onTrimmedBlobChange,
}: AudioTrimPlaybackWithBlobProps) {
  const [audioVersion, setAudioVersion] = useState(0)
  const [originalAudioBuffer, setOriginalAudioBuffer] =
    useState<AudioBuffer | null>(null)

  const handleTrim = (regionTimestamps: { start: number; end: number }) => {
    if (!originalAudioBuffer) return

    // Clean up the old blob URL before creating a new one
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl)
    }

    try {
      // Trim the original AudioBuffer using region timestamps
      const sampleRate = originalAudioBuffer.sampleRate
      const numberOfChannels = originalAudioBuffer.numberOfChannels

      // Calculate sample indices for the region
      const startIndex = Math.max(
        0,
        Math.floor(regionTimestamps.start * sampleRate),
      )
      const endIndex = Math.min(
        originalAudioBuffer.length,
        Math.floor(regionTimestamps.end * sampleRate),
      )

      if (endIndex <= startIndex) {
        console.warn('Invalid region: end <= start')
        return
      }

      const trimmedLength = endIndex - startIndex

      // Create new AudioBuffer for the trimmed audio
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const trimmedBuffer = audioContext.createBuffer(
        numberOfChannels,
        trimmedLength,
        sampleRate,
      )

      // Copy the selected region from each channel
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const originalChannelData = originalAudioBuffer.getChannelData(channel)
        const trimmedChannelData = trimmedBuffer.getChannelData(channel)
        trimmedChannelData.set(
          originalChannelData.subarray(startIndex, endIndex),
        )
      }

      // Convert the trimmed AudioBuffer back to a blob (preserving original format)
      const trimmedBlob = audioBufferToBlob(trimmedBuffer)

      // Update the state with the trimmed blob and increment version to force remount
      const newBlobUrl = URL.createObjectURL(trimmedBlob)
      setAudioBlob(trimmedBlob)
      setAudioBlobUrl(newBlobUrl)
      setAudioVersion((prev) => prev + 1)
      setIsLoading(false)
      setError(null)

      // Call the new props if provided
      if (onTrim) {
        onTrim(regionTimestamps)
      }
      if (onTrimmedBlobChange) {
        onTrimmedBlobChange(trimmedBlob)
      }
    } catch (error) {
      console.error('Error trimming audio:', error)
      setError(error as Error)
      setIsLoading(false)
    }
  }

  const srcUrl = useMemo(
    () => (externalAudioUrlFn ? externalAudioUrlFn(src) : src),
    [externalAudioUrlFn, src],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null)

  // Cleanup blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl)
      }
    }
  }, [audioBlobUrl])

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setOriginalAudioBuffer(null)
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl)
    }
    loadAudio(srcUrl)
      .then((result) => {
        setAudioBlobUrl(result.blobUrl)
        setAudioBlob(result.blob)
        setOriginalAudioBuffer(result.audioBuffer)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcUrl])

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

  if (audioBlob && audioBlobUrl && originalAudioBuffer) {
    return (
      <AudioTrimPlayback
        key={audioVersion}
        src={{ mode: 'blob', blob: audioBlob }}
        onTrim={handleTrim}
      />
    )
  }
  return <div>No audio source found</div>
}
