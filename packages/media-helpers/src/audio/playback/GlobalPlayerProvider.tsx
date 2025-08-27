import { useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
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
  const [globalPlayerState, setGlobalPlayerState] =
    useState<GlobalPlayerState | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GLOBAL_PLAYER_STORAGE_KEY)
      if (stored) {
        const state = JSON.parse(stored) as GlobalPlayerState
        const isRecent = Date.now() - state.timestamp < 24 * 60 * 60 * 1000
        if (isRecent) {
          setGlobalPlayerState(state)
          setIsVisible(true)
        } else {
          localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
        }
      }
    } catch (err) {
      console.error('Failed to load global player state:', err)
      localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
      toast.error('Failed to load saved player state')
    }
  }, [])

  useEffect(() => {
    if (!globalPlayerState) return

    const interval = setInterval(() => {
      try {
        const updatedState = {
          ...globalPlayerState,
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
    }, 1000)

    return () => clearInterval(interval)
  }, [globalPlayerState])

  const addToGlobalPlayer = (src: string, trackName?: string) => {
    const newState: GlobalPlayerState = {
      src,
      trackName,
      currentTime: 0,
      volume: 1,
      playbackRate: 1,
      timestamp: Date.now(),
    }

    setGlobalPlayerState(newState)
    setIsVisible(true)

    try {
      localStorage.setItem(GLOBAL_PLAYER_STORAGE_KEY, JSON.stringify(newState))
    } catch (err) {
      console.error('Failed to save global player state:', err)
      toast.error('Failed to save player state')
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setGlobalPlayerState(null)
    localStorage.removeItem(GLOBAL_PLAYER_STORAGE_KEY)
  }

  return (
    <GlobalPlayerContext.Provider
      value={{ addToGlobalPlayer, isGlobalPlayerVisible: isVisible }}
    >
      {children}
      {isVisible && globalPlayerState && (
        <GlobalPlayer
          externalAudioUrlFn={externalAudioUrlFn}
          playerState={globalPlayerState}
          onClose={handleClose}
        />
      )}
    </GlobalPlayerContext.Provider>
  )
}
