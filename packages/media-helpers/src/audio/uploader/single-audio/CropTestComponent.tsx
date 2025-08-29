import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import {
  Crop,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js'

// Type declaration for webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

const regions = RegionsPlugin.create()

// Utility function to convert AudioBuffer to WAV Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const length = buffer.length
  const numberOfChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const bytesPerSample = 2 // 16-bit
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

  // Write audio data
  let offset = 44
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel)
      let sample = Math.max(-1, Math.min(1, channelData[i])) // Clamp to [-1, 1]
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff // Convert to 16-bit
      view.setInt16(offset, sample, true)
      offset += 2
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' })
}

type AudioSource =
  | {
      mode: 'url'
      url: string
      externalAudioUrlFn?: (url: string) => string
    }
  | {
      mode: 'blob'
      blob: Blob
    }

type AudioPlaybackProps = {
  src: AudioSource
  className?: string
  onTrim?: (trimmedBlob: Blob) => void
}

export function CropTestComponent({
  src,
  className,
  onTrim,
}: AudioPlaybackProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const timestampsRef = useRef<HTMLDivElement | null>(null)
  const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer>()
  const [volume, setVolume] = useState<number>(1)
  const [playing, setPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if (timelineRef.current && timestampsRef.current && !wavesurferObj) {
      if (timelineRef.current) {
        timelineRef.current.innerHTML = ''
      }

      const ws = WaveSurfer.create({
        container: timelineRef.current,
        cursorColor: 'oklch(0.769 0.188 70.08)',
        waveColor: 'oklch(0.708 0 0)',
        progressColor: 'oklch(0.769 0.188 70.08)',
        height: 32,
        normalize: true,
        fillParent: true,
        plugins: [
          TimelinePlugin.create({
            container: timestampsRef.current,
          }),
          regions,
        ],
      })

      setWavesurferObj(ws)
    }
  }, [wavesurferObj])

  useEffect(() => {
    if (src && wavesurferObj) {
      if (src.mode === 'url') {
        if (src.externalAudioUrlFn) {
          wavesurferObj.load(src.externalAudioUrlFn(src.url))
        } else {
          wavesurferObj.load(src.url)
        }
      } else if (src.mode === 'blob') {
        wavesurferObj.loadBlob(src.blob)
      }
    }
  }, [src, wavesurferObj])

  useEffect(() => {
    if (wavesurferObj) {
      const handleReady = () => {
        regions.enableDragSelection({})
        setDuration(Math.floor(wavesurferObj.getDuration()))
      }

      const handlePlay = () => {
        setPlaying(true)
      }

      const handleFinish = () => {
        setPlaying(false)
      }

      regions.on('region-created', () => {
        const regionList = regions.getRegions()
        const keys = Object.keys(regionList)
        // Remove all regions except the last one (most recently created)
        while (keys.length > 1) {
          const firstKey = keys[0]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(regionList as Record<string, any>)[firstKey].remove()
          keys.shift()
        }
      })

      regions.on('region-updated', () => {
        const regionList = regions.getRegions()
        const keys = Object.keys(regionList)
        // Remove all regions except the last one (most recently updated)
        while (keys.length > 1) {
          const firstKey = keys[0]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(regionList as Record<string, any>)[firstKey].remove()
          keys.shift()
        }
      })

      wavesurferObj.on('ready', handleReady)
      wavesurferObj.on('play', handlePlay)
      wavesurferObj.on('finish', handleFinish)

      return () => {
        wavesurferObj.destroy()
        setWavesurferObj(undefined)
      }
    }
  }, [wavesurferObj])

  useEffect(() => {
    if (duration && wavesurferObj) {
      regions.addRegion({
        start: Math.floor(duration / 2) - Math.floor(duration) / 5,
        end: Math.floor(duration / 2),
        color: 'hsla(265, 100%, 86%, 0.4)',
      })
    }
  }, [duration, wavesurferObj])

  function handlePlayPause() {
    if (!wavesurferObj) return
    wavesurferObj.playPause()
    setPlaying(!playing)
  }

  function handleReload() {
    if (!wavesurferObj) return
    wavesurferObj.stop()
    wavesurferObj.play()
    setPlaying(true)
  }

  function handleVolumeSlider(value: number[]) {
    if (!wavesurferObj) return
    wavesurferObj.setVolume(value[0] / 100)
    setVolume(value[0] / 100)
  }

  function handleZoomSlider(value: number[]) {
    if (!wavesurferObj) return
    wavesurferObj.zoom(value[0])
    setZoom(value[0])
  }

  function handleTrim() {
    if (!wavesurferObj) return
    const regionList = regions.getRegions()
    const regionKeys = Object.keys(regionList)
    if (regionKeys.length === 0) return
    const firstKey = regionKeys[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const region = (regionList as Record<string, any>)[firstKey]
    if (!region) return

    const original_buffer = wavesurferObj.getDecodedData()
    if (!original_buffer) {
      return
    }

    // Check if we have channels and handle both mono and stereo
    const numberOfChannels = original_buffer.numberOfChannels
    const channel1 = original_buffer.getChannelData(0)
    const channel2 =
      numberOfChannels > 1 ? original_buffer.getChannelData(1) : null

    if (!channel1) {
      return
    }

    const start = region.start
    const end = region.end
    const sampleRate = original_buffer.sampleRate

    // Calculate indices for the selected region
    const startIndex = Math.max(
      0,
      Math.min(original_buffer.length, Math.floor(start * sampleRate)),
    )
    const endIndex = Math.max(
      0,
      Math.min(original_buffer.length, Math.floor(end * sampleRate)),
    )

    if (endIndex <= startIndex) {
      // nothing to trim
      return
    }

    // Calculate new buffer length (keeping only the selected region)
    const newLength = endIndex - startIndex
    const newDuration = newLength / sampleRate

    // Create arrays for the trimmed audio (keeping only selected region)
    const trimmedChannel1 = new Float32Array(newLength)
    const trimmedChannel2 =
      numberOfChannels > 1 ? new Float32Array(newLength) : null

    // Copy only the selected region
    trimmedChannel1.set(channel1.subarray(startIndex, endIndex))
    if (channel2 && trimmedChannel2) {
      trimmedChannel2.set(channel2.subarray(startIndex, endIndex))
    }

    // Prepare channel data for createBuffer
    const channelData = [trimmedChannel1]
    if (trimmedChannel2) {
      channelData.push(trimmedChannel2)
    }

    // Create AudioBuffer from the trimmed channel data
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContextClass()
    const trimmedBuffer = audioContext.createBuffer(
      numberOfChannels,
      newLength,
      sampleRate,
    )

    // Copy channel data to the new buffer
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = channel === 0 ? trimmedChannel1 : trimmedChannel2
      if (channelData) {
        trimmedBuffer.getChannelData(channel).set(channelData)
      }
    }

    // Convert to blob and call callback if provided
    const trimmedBlob = audioBufferToWav(trimmedBuffer)
    if (onTrim) {
      onTrim(trimmedBlob)
    }

    // Load the trimmed audio back into wavesurfer
    wavesurferObj.load('', channelData, newDuration)
  }

  return (
    <div
      className={cn(
        'p-4 pt-2 sm:pt-4 w-full select-none flex gap-2 sm:flex-row flex-col min-w-[250px]',
        className,
      )}
    >
      <div className="flex items-center justify-center space-x-2">
        <VolumeControl
          volume={volume}
          handleVolumeSlider={handleVolumeSlider}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(zoom - 0.1)}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button variant="default" size="icon" onClick={handlePlayPause}>
          {playing ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(zoom + 0.1)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <SetZoom zoom={zoom} handleZoomChange={handleZoomSlider} />
        <Button variant="default" size="icon" onClick={handleReload}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon" onClick={handleTrim}>
          <Crop className="h-4 w-4" />
        </Button>
      </div>

      <div className="gap-2 flex flex-row w-full justify-center items-center text-sm text-muted-foreground">
        <div ref={timelineRef} className="w-full" />
        <div ref={timestampsRef} className="w-full" />
      </div>
    </div>
  )
}

function VolumeControl({
  volume,
  handleVolumeSlider,
}: {
  volume: number
  handleVolumeSlider: (value: number[]) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-4" align="end">
        <div className="space-y-4">
          <span className="text-sm font-medium">Volume</span>
          <Slider
            value={[volume * 100]}
            onValueChange={handleVolumeSlider}
            max={100}
            step={1}
            className="w-full"
            orientation="vertical"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SetZoom({
  zoom,
  handleZoomChange,
}: {
  zoom: number
  handleZoomChange: (value: number[]) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-4" align="end">
        <div className="space-y-4">
          <span className="text-sm font-medium">Zoom</span>
          <Slider
            value={[zoom]}
            onValueChange={handleZoomChange}
            max={1000}
            min={1}
            step={50}
            className="w-full"
            orientation="vertical"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
