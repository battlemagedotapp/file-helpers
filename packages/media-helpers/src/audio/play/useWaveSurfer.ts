import { useCallback, useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export type WaveSurferOptions = {
  container: HTMLElement
  waveColor?: string
  progressColor?: string
  cursorColor?: string
  barWidth?: number
  barRadius?: number
  cursorWidth?: number
  height?: number
  barGap?: number
  responsive?: boolean
  normalize?: boolean
  partialRender?: boolean
  zoom?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: any[]
}

export type UseWaveSurferReturn = {
  wavesurfer: WaveSurfer | null
  isReady: boolean
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isLoading: boolean
  error: string | null
  play: () => Promise<void>
  pause: () => void
  setTime: (time: number) => void
  setVolume: (volume: number) => void
  setPlaybackRate: (rate: number) => void
  zoom: (level: number) => void
  loadBlob: (blob: Blob) => Promise<void>
  destroy: () => void
}

export function useWaveSurfer(options: WaveSurferOptions): UseWaveSurferReturn {
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!options.container) return

    const wavesurfer = WaveSurfer.create({
      waveColor: '#4F4A85',
      progressColor: '#383351',
      cursorColor: '#333',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 80,
      barGap: 2,
      normalize: true,
      ...options,
    })

    wavesurferRef.current = wavesurfer

    wavesurfer.on('ready', () => {
      setIsReady(true)
      setDuration(wavesurfer.getDuration())
      setIsLoading(false)
      setError(null)
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

    wavesurfer.on('timeupdate', (time) => {
      setCurrentTime(time)
    })

    wavesurfer.on('error', (err) => {
      console.error('WaveSurfer error:', err)
      setError(err.toString())
      setIsLoading(false)
    })

    return () => {
      wavesurfer.destroy()
    }
  }, [options.container])

  const play = useCallback(async () => {
    if (!wavesurferRef.current || !isReady) return

    try {
      await wavesurferRef.current.play()
    } catch (err) {
      console.error('Failed to play audio:', err)
      setError(err instanceof Error ? err.message : 'Failed to play audio')
    }
  }, [isReady])

  const pause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause()
    }
  }, [])

  const setTime = useCallback((time: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setTime(time)
    }
  }, [])

  const setVolumeCallback = useCallback((vol: number) => {
    setVolume(vol)
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(vol)
    }
  }, [])

  const setPlaybackRate = useCallback((rate: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(rate)
    }
  }, [])

  const zoom = useCallback((level: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.zoom(level)
    }
  }, [])

  const loadBlob = useCallback(async (blob: Blob) => {
    if (!wavesurferRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      await wavesurferRef.current.loadBlob(blob)
    } catch (err) {
      console.error('Failed to load blob:', err)
      setError(err instanceof Error ? err.message : 'Failed to load audio')
      setIsLoading(false)
    }
  }, [])

  const destroy = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy()
      wavesurferRef.current = null
    }
  }, [])

  return {
    wavesurfer: wavesurferRef.current,
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    play,
    pause,
    setTime,
    setVolume: setVolumeCallback,
    setPlaybackRate,
    zoom,
    loadBlob,
    destroy,
  }
}
