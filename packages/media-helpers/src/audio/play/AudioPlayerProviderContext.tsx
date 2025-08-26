import { createContext, useContext } from 'react'

export type TransformAudioUrlFn = (storageId: string) => string

const defaultTransform: TransformAudioUrlFn = (storageId: string) => storageId

const AudioPlayerContext = createContext<{
  transformAudioUrlFn: TransformAudioUrlFn
}>({
  transformAudioUrlFn: defaultTransform,
})

export const useAudioPlayer = () => useContext(AudioPlayerContext)

export default AudioPlayerContext
