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

const regions = RegionsPlugin.create()

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
}

export function CropTestComponent({ src, className }: AudioPlaybackProps) {
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

      regions.on('region-updated', () => {
        const regionList = regions.getRegions()
        const keys = Object.keys(regionList)
        if (keys.length > 1) {
          regionList[0].remove()
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
    const region = regions.getRegions()[0]
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

    // Calculate indices for trimming and clamp them to valid ranges
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

    // Calculate new buffer length (removing the trimmed section)
    const newLength = original_buffer.length - (endIndex - startIndex)
    const newDuration = newLength / sampleRate

    // Create arrays for the trimmed audio
    const trimmedChannel1 = new Float32Array(newLength)
    const trimmedChannel2 =
      numberOfChannels > 1 ? new Float32Array(newLength) : null

    // Copy data before the trim region (safe copy with known lengths)
    const beforeLength = startIndex
    if (beforeLength > 0) {
      trimmedChannel1.set(channel1.subarray(0, startIndex), 0)
      if (channel2 && trimmedChannel2) {
        trimmedChannel2.set(channel2.subarray(0, startIndex), 0)
      }
    }

    // Copy data after the trim region (copy into position `beforeLength`)
    const afterLength = original_buffer.length - endIndex
    if (afterLength > 0) {
      // Ensure we don't write past the end of trimmed arrays
      trimmedChannel1.set(
        channel1.subarray(endIndex, endIndex + afterLength),
        beforeLength,
      )
      if (channel2 && trimmedChannel2) {
        trimmedChannel2.set(
          channel2.subarray(endIndex, endIndex + afterLength),
          beforeLength,
        )
      }
    }

    // Prepare channel data for createBuffer
    const channelData = [trimmedChannel1]
    if (trimmedChannel2) {
      channelData.push(trimmedChannel2)
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
