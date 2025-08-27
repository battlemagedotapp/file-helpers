import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Pause, Play, Redo, Undo, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

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
  externalAudioUrlFn?: (url: string) => string
  trackId?: string
  trackName?: string
  initialVolume?: number
  initialPlaybackRate?: number
  initialCurrentTime?: number
  initialPlaying?: boolean
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

export function AudioPlayback({
  src,
  externalAudioUrlFn,
  trackId,
  trackName,
  initialVolume = 1,
  initialPlaybackRate = 1,
  initialCurrentTime = 0,
  initialPlaying = false,
}: AudioPlaybackProps) {
  const wavesurferRef = useRef(null)
  const timelineRef = useRef(null)
  const [currentTime, setCurrentTime] = useState<number>(initialCurrentTime)
  const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer>()
  const [volume, setVolume] = useState<number>(initialVolume)
  const [playing, setPlaying] = useState(initialPlaying)
  const [duration, setDuration] = useState<number>(0)
  const [playbackRate, setPlaybackRate] = useState<number>(initialPlaybackRate)

  useEffect(() => {
    if (timelineRef.current && wavesurferRef.current && !wavesurferObj) {
      setWavesurferObj(
        WaveSurfer.create({
          container: timelineRef.current,
          cursorColor: 'violet',
          waveColor: '#211027',
          progressColor: '#69207F',
          barWidth: 2,
          barRadius: 3,
          barGap: 2,
          height: 40,
          normalize: true,
        }),
      )
    }
  }, [wavesurferRef, wavesurferObj])

  useEffect(() => {
    if (src && wavesurferObj) {
      if (src.mode === 'url') {
        if (externalAudioUrlFn) {
          wavesurferObj.load(externalAudioUrlFn(src.url))
        } else {
          wavesurferObj.load(src.url)
        }
      } else if (src.mode === 'blob') {
        wavesurferObj.loadBlob(src.blob)
      }

      updatePlaybackState({
        wavesurferObj,
        initialVolume,
        initialPlaybackRate,
        initialCurrentTime,
        initialPlaying,
      })
    }
  }, [
    src,
    wavesurferObj,
    externalAudioUrlFn,
    initialVolume,
    initialPlaybackRate,
    initialCurrentTime,
    initialPlaying,
  ])

  useEffect(() => {
    if (wavesurferObj) {
      const handleReady = () => {
        wavesurferObj.pause()
        setDuration(wavesurferObj.getDuration())
      }

      const handlePlay = () => {
        setPlaying(true)
      }

      const handleFinish = () => {
        setPlaying(false)
      }

      const handleTimeUpdate = (currentTime: number) => {
        setCurrentTime(currentTime)
      }

      wavesurferObj.on('ready', handleReady)
      wavesurferObj.on('play', handlePlay)
      wavesurferObj.on('finish', handleFinish)
      wavesurferObj.on('timeupdate', handleTimeUpdate)

      return () => {
        wavesurferObj.destroy()
      }
    }
  }, [wavesurferObj])

  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume)
  }, [volume, wavesurferObj])

  function updatePlaybackState({
    wavesurferObj,
    initialVolume,
    initialPlaybackRate,
    initialCurrentTime,
    initialPlaying,
  }: {
    wavesurferObj: WaveSurfer
    initialVolume: number
    initialPlaybackRate: number
    initialCurrentTime: number
    initialPlaying: boolean
  }) {
    wavesurferObj.setVolume(initialVolume)
    wavesurferObj.setPlaybackRate(initialPlaybackRate)
    wavesurferObj.setTime(initialCurrentTime)
    if (initialPlaying) {
      wavesurferObj.play()
      setPlaying(true)
    } else {
      wavesurferObj.pause()
      setPlaying(false)
    }
  }

  function handlePlayPause() {
    wavesurferObj?.playPause()
    setPlaying(!playing)
  }

  function handleVolumeSlider(value: number[]) {
    setVolume(value[0] / 100)
  }

  function handleSpeedChange(newSpeed: number) {
    if (wavesurferObj) {
      wavesurferObj.setPlaybackRate(newSpeed)
      setPlaybackRate(newSpeed)
    }
  }

  function handleSkip(direction: 'forward' | 'backward') {
    if (wavesurferObj && duration > 0) {
      const skipTime = direction === 'forward' ? 10 : -10
      const newTime = Math.max(0, Math.min(duration, currentTime + skipTime))
      wavesurferObj.setTime(newTime)
    }
  }

  return (
    <div
      key={trackId}
      className="bg-background border rounded-lg p-4 select-none"
    >
      {!!trackName && (
        <div className="flex flex-row items-center justify-center">
          <p className="text-sm font-semibold">{trackName}</p>
        </div>
      )}
      <div className="flex items-center justify-center space-x-2">
        <VolumeControl
          volume={volume}
          handleVolumeSlider={handleVolumeSlider}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSkip('backward')}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={handlePlayPause}
          className="h-12 w-12"
        >
          {playing ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSkip('forward')}
        >
          <Redo className="h-4 w-4" />
        </Button>

        <SpeedControl
          playbackRate={playbackRate}
          handleSpeedChange={handleSpeedChange}
        />
      </div>

      <div className="space-x-2 flex items-center text-sm text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <div ref={timelineRef} className="w-full" />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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

function SpeedControl({
  playbackRate,
  handleSpeedChange,
}: {
  playbackRate: number
  handleSpeedChange: (newSpeed: number) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {playbackRate}x
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Speed</span>
          </div>
          <div className="flex flex-col gap-2">
            {speeds.map((speed) => (
              <Button
                key={speed}
                variant={playbackRate === speed ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleSpeedChange(speed)}
                className="text-xs"
              >
                {speed}x
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
