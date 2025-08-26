import AudioPlayerContext, {
  type TransformAudioUrlFn,
} from '@/audio/play/AudioPlayerProviderContext'
import React from 'react'

type AudioPlayerProviderProps = {
  transformAudioUrlFn?: TransformAudioUrlFn
  children: React.ReactNode
}

export function AudioPlayerProvider({
  transformAudioUrlFn,
  children,
}: AudioPlayerProviderProps) {
  const fn = transformAudioUrlFn ?? ((id: string) => id)
  return (
    <AudioPlayerContext.Provider value={{ transformAudioUrlFn: fn }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerProvider
