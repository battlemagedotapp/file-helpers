import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import WaveSurfer from 'wavesurfer.js'
import { GlobalPlayer } from './GlobalPlayer'
import { GlobalPlayerContext } from './GlobalPlayerContext'

const GLOBAL_PLAYER_STORAGE_KEY = 'global-audio-player'

type GlobalPlayerState = {
  src: string
  trackName?: string
  currentTime: number
  volume: number
  playbackRate: number
  timestamp: number
}

export function GlobalPlayerProvider({
  children,
  externalAudioUrlFn,
}: {
  children: ReactNode
  externalAudioUrlFn?: (url: string) => string
}) {
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const loadInitialState = (): GlobalPlayerState | null => {
    try {
      const stored = localStorage.getItem(GLOBAL_PLAYER_STORAGE_KEY)
      if (stored) {
        const state = JSON.parse(stored) as GlobalPlayerState
        const isRecent = Date.now() - state.timestamp < 24 * 60 * 60 * 1000
        if (isRecent) return state
        localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
      }
    } catch (err) {
      console.error('Failed to load global player state:', err)
      localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
      toast.error('Failed to load saved player state')
    }
    return null
  }

  const initialStored = loadInitialState()
  const [storedPlayerState, setStoredPlayerState] =
    useState<GlobalPlayerState | null>(initialStored)
  const storedPlayerStateRef = useRef<GlobalPlayerState | null>(initialStored)
  const [isVisible, setIsVisible] = useState<boolean>(
    () => initialStored != null,
  )

  const updateStoredState = useCallback((next: GlobalPlayerState | null) => {
    storedPlayerStateRef.current = next
    setStoredPlayerState(next)
  }, [])

  useEffect(() => {
    const wsRef = wavesurferRef
    if (!wsRef) return

    const interval = setInterval(() => {
      try {
        const currentStored = storedPlayerStateRef.current
        if (!currentStored) return
        const ws = wsRef.current
        if (!ws) return

        if (!ws.isPlaying()) return

        const currentTime = ws.getCurrentTime()
        const volume = ws.getVolume()
        const playbackRate = ws.getPlaybackRate()

        const updatedState: GlobalPlayerState = {
          ...currentStored,
          currentTime,
          volume,
          playbackRate,
          timestamp: Date.now(),
        }

        localStorage.setItem(
          GLOBAL_PLAYER_STORAGE_KEY,
          JSON.stringify(updatedState),
        )
      } catch (err) {
        console.error('Failed to save global player state:', err)
        toast.error('Failed to save player state')
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [wavesurferRef])

  const addToGlobalPlayer = useCallback(
    (src: string, trackName?: string) => {
      const newState: GlobalPlayerState = {
        src,
        trackName,
        currentTime: 0,
        volume: 1,
        playbackRate: 1,
        timestamp: Date.now(),
      }

      updateStoredState(newState)
      setIsVisible(true)

      try {
        localStorage.setItem(
          GLOBAL_PLAYER_STORAGE_KEY,
          JSON.stringify(newState),
        )
        toast.success('Added. Press the play button to play.')
      } catch (err) {
        console.error('Failed to save global player state:', err)
        toast.error('Failed to save player state')
      }
    },
    [updateStoredState],
  )

  const handleWavesurferReady = useCallback((wavesurfer: WaveSurfer) => {
    wavesurferRef.current = wavesurfer
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    updateStoredState(null)
    wavesurferRef.current = null
    localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
  }, [updateStoredState])

  return (
    <GlobalPlayerContext.Provider
      value={{ addToGlobalPlayer, isGlobalPlayerVisible: isVisible }}
    >
      {children}
      {isVisible && storedPlayerState && (
        <GlobalPlayer
          externalAudioUrlFn={externalAudioUrlFn}
          playerState={storedPlayerState}
          onClose={handleClose}
          onWavesurferReady={handleWavesurferReady}
        />
      )}
    </GlobalPlayerContext.Provider>
  )
}
