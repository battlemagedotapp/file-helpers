import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Crop, Pause, Play, Volume2, VolumeX, X, ZoomIn } from 'lucide-react'
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

type AudioTrimPlaybackProps = {
  src: AudioSource
  className?: string
  onTrim?: (regionTimestamps: { start: number; end: number }) => void
}

export function AudioTrimPlayback({
  src,
  className,
  onTrim,
}: AudioTrimPlaybackProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const timestampsRef = useRef<HTMLDivElement | null>(null)
  const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer>()
  const [volume, setVolume] = useState<number>(1)
  const [playing, setPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)

  const [isTrimMode, setIsTrimMode] = useState(false)

  // Reset state when src changes (component remounts)
  useEffect(() => {
    setPlaying(false)
    setVolume(1)
    setZoom(1)
    setWavesurferObj(undefined)
    setIsTrimMode(false)
  }, [src])

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
        if (isTrimMode) {
          regions.enableDragSelection({})
        }
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
        // Properly stop playback before destroying
        if (wavesurferObj.isPlaying()) {
          wavesurferObj.stop()
        }
        wavesurferObj.destroy()
        setWavesurferObj(undefined)
      }
    }
  }, [wavesurferObj, isTrimMode])

  // Cleanup effect when component unmounts (important for remounting)
  useEffect(() => {
    return () => {
      if (wavesurferObj) {
        if (wavesurferObj.isPlaying()) {
          wavesurferObj.stop()
        }
        wavesurferObj.destroy()
        setWavesurferObj(undefined)
      }
      setPlaying(false)
      setVolume(1)
      setZoom(1)
      setIsTrimMode(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array means this runs on unmount

  function handlePlayPause() {
    if (!wavesurferObj) return
    wavesurferObj.playPause()
    setPlaying(!playing)
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

  function handleTrimMode() {
    setIsTrimMode(true)
    if (wavesurferObj) {
      // Stop playback before entering trim mode to prevent state instability
      if (wavesurferObj.isPlaying()) {
        wavesurferObj.stop()
        setPlaying(false)
      }
      regions.enableDragSelection({})
    }
  }

  function handleCancelTrim() {
    setIsTrimMode(false)
    if (wavesurferObj) {
      // Stop playback before canceling to prevent state instability
      if (wavesurferObj.isPlaying()) {
        wavesurferObj.stop()
        setPlaying(false)
      }

      // Clear all regions
      const regionList = regions.getRegions()
      const keys = Object.keys(regionList)
      keys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(regionList as Record<string, any>)[key].remove()
      })
    }
  }

  function handleConfirmTrim() {
    if (!wavesurferObj) return
    const regionList = regions.getRegions()
    const regionKeys = Object.keys(regionList)
    if (regionKeys.length === 0) return
    const firstKey = regionKeys[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const region = (regionList as Record<string, any>)[firstKey]
    if (!region) return

    // Stop playback before processing trim to prevent state instability
    if (wavesurferObj.isPlaying()) {
      wavesurferObj.stop()
      setPlaying(false)
    }

    // Send region timestamps to parent component for processing
    if (onTrim) {
      onTrim({
        start: region.start,
        end: region.end,
      })
    }

    // Exit trim mode after confirming
    setIsTrimMode(false)
  }

  return (
    <div
      className={cn(
        'p-4 pt-2 sm:pt-4 w-full select-none flex gap-2 flex-col min-w-[250px]',
        className,
      )}
    >
      <div className="gap-2 flex flex-col w-full justify-center items-center text-sm text-muted-foreground">
        <div ref={timelineRef} className="w-full" />
        <div ref={timestampsRef} className="w-full" />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button variant="secondary" size="icon" onClick={handlePlayPause}>
          {playing ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <VolumeControl
          volume={volume}
          handleVolumeSlider={handleVolumeSlider}
        />
        <SetZoom zoom={zoom} handleZoomChange={handleZoomSlider} />

        {!isTrimMode ? (
          <>
            <Button variant="default" size="default" onClick={handleTrimMode}>
              <Crop className="h-4 w-4" /> Trim
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="default" onClick={handleCancelTrim}>
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={handleConfirmTrim}
            >
              <Crop className="h-4 w-4" /> Confirm Trim
            </Button>
          </>
        )}
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
          <ZoomIn className="h-4 w-4" />
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
