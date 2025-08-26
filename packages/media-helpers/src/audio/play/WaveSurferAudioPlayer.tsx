import { useAudioPlayer } from '@/audio/play/AudioPlayerProviderContext'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import {
  Loader2,
  Pause,
  Play,
  Redo,
  Undo,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

type WaveSurferAudioPlayerProps = {
  src: string
  className?: string
  externalAudioUrlFn?: (url: string) => string
  compact?: boolean
}

export function WaveSurferAudioPlayer({
  src,
  className,
  externalAudioUrlFn,
  compact = false,
}: WaveSurferAudioPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const { transformAudioUrlFn } = useAudioPlayer()

  const audioSrc = externalAudioUrlFn
    ? externalAudioUrlFn(src)
    : transformAudioUrlFn(src)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (!waveformRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'oklch(0.556 0 0)',
      progressColor: 'oklch(0.145 0 0)',
      cursorColor: 'oklch(0.145 0 0)',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: compact ? 60 : 80,
      barGap: 2,
      normalize: true,
    })

    wavesurferRef.current = wavesurfer

    // Event listeners
    wavesurfer.on('ready', () => {
      setIsLoaded(true)
      setDuration(wavesurfer.getDuration())
      setIsLoading(false)
    })

    wavesurfer.on('play', () => {
      setIsPlaying(true)
    })

    wavesurfer.on('pause', () => {
      setIsPlaying(false)
    })

    wavesurfer.on('finish', () => {
      setIsPlaying(false)
    })

    wavesurfer.on('timeupdate', (currentTime) => {
      setCurrentTime(currentTime)
    })

    wavesurfer.on('error', (error) => {
      console.error('WaveSurfer error:', error)
      setIsLoading(false)
    })

    return () => {
      wavesurfer.destroy()
    }
  }, [compact])

  // Load audio when audioSrc changes
  useEffect(() => {
    if (!wavesurferRef.current || !audioSrc) return

    const loadAudio = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(audioSrc)
        if (!response.ok) {
          throw new Error(`Failed to fetch audio: ${response.statusText}`)
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)

        await wavesurferRef.current!.loadBlob(blob)
      } catch (error) {
        console.error('Failed to load audio:', error)
        setIsLoading(false)
      }
    }

    loadAudio()
  }, [audioSrc])

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const handlePlay = useCallback(async () => {
    if (!wavesurferRef.current || !isLoaded) return

    try {
      await wavesurferRef.current.play()
    } catch (error) {
      console.error('Failed to play audio:', error)
    }
  }, [isLoaded])

  const handlePause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause()
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume)
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const handleMuteToggle = () => {
    if (wavesurferRef.current) {
      if (isMuted) {
        wavesurferRef.current.setVolume(volume)
        setIsMuted(false)
      } else {
        wavesurferRef.current.setVolume(0)
        setIsMuted(true)
      }
    }
  }

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackRate(newSpeed)
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(newSpeed)
    }
  }

  const handleSkip = (direction: 'forward' | 'backward') => {
    if (wavesurferRef.current && duration > 0) {
      const skipTime = direction === 'forward' ? 10 : -10
      const newTime = Math.max(0, Math.min(duration, currentTime + skipTime))
      wavesurferRef.current.setTime(newTime)
    }
  }

  return (
    <div
      className={cn(
        'bg-background border rounded-lg p-4 select-none',
        compact ? 'w-full space-y-4' : 'w-full',
        className,
      )}
      style={{ minWidth: compact ? '300px' : '400px', flexShrink: 0 }}
    >
      {compact ? (
        <>
          <div className="flex items-center justify-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" disabled={!isLoaded}>
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-4" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Volume</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMuteToggle}
                      className="h-6 w-6 p-0"
                    >
                      {isMuted ? (
                        <VolumeX className="h-3 w-3" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    disabled={!isLoaded}
                    className="w-full"
                    orientation="vertical"
                  />
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSkip.bind(null, 'backward')}
              disabled={!isLoaded}
            >
              <Undo className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={isLoading}
              className="h-12 w-12"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSkip.bind(null, 'forward')}
              disabled={!isLoaded}
            >
              <Redo className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" disabled={!isLoaded}>
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
          </div>

          <div className="space-x-2 flex items-center text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <div
              ref={waveformRef}
              className="w-full"
              style={{ minHeight: '60px' }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" disabled={!isLoaded}>
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Volume</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMuteToggle}
                    className="h-6 w-6 p-0"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  disabled={!isLoaded}
                  className="w-full"
                  orientation="vertical"
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSkip.bind(null, 'backward')}
            disabled={!isLoaded}
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={isLoading}
            className="h-12 w-12"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSkip.bind(null, 'forward')}
            disabled={!isLoaded}
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="flex-1 max-lg:w-full space-x-2 flex flex-row items-center text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <div
              ref={waveformRef}
              className="w-full"
              style={{ minHeight: '80px' }}
            />
            <span>{formatTime(duration)}</span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" disabled={!isLoaded}>
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
        </div>
      )}
    </div>
  )
}

export default WaveSurferAudioPlayer
