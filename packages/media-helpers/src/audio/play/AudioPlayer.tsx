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

type AudioPlayerProps = {
  src: string
  className?: string
  externalAudioUrlFn?: (url: string) => string
  compact?: boolean
}

export function AudioPlayer({
  src,
  className,
  externalAudioUrlFn,
  compact = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
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

  const fetchAndPlay = useCallback(async () => {
    if (!audioSrc || audioUrl) return

    setIsLoading(true)
    try {
      const response = await fetch(audioSrc)
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)

      if (audioRef.current) {
        audioRef.current.src = url
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Failed to fetch audio as blob:', error)
    } finally {
      setIsLoading(false)
    }
  }, [audioSrc, audioUrl])

  const handlePlay = useCallback(async () => {
    if (!audioRef.current) return

    if (!audioUrl) {
      await fetchAndPlay()
      return
    }

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Failed to play audio:', error)
    }
  }, [audioUrl, fetchAndPlay])

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackRate(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  const handleSkip = (direction: 'forward' | 'backward') => {
    if (audioRef.current) {
      const skipTime = direction === 'forward' ? 10 : -10
      const newTime = Math.max(0, Math.min(duration, currentTime + skipTime))
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleCanPlay = () => setIsLoaded(true)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [audioUrl])

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  return (
    <div
      className={cn(
        'bg-background border rounded-lg p-4 select-none',
        compact ? 'w-full space-y-4' : 'w-full',
        className,
      )}
      style={{ minWidth: compact ? '300px' : '400px', flexShrink: 0 }}
    >
      <audio
        ref={audioRef}
        preload="none"
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          const audio = audioRef.current
          if (audio) {
            setDuration(audio.duration)
            setIsLoaded(true)
          }
        }}
        onCanPlay={() => setIsLoaded(true)}
        onError={(e) => {
          console.error('Audio error:', e)
        }}
      />

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

          <div className="space-y-2">
            <Slider
              value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              disabled={!isLoaded}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
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

          <div className="flex-1 max-lg:w-full space-y-2">
            <Slider
              value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              disabled={!isLoaded}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
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

export default AudioPlayer
