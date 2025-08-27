import { createContext } from 'react'

export type GlobalPlayerContextType = {
  addToGlobalPlayer: (src: string, trackName?: string) => void
  isGlobalPlayerVisible: boolean
}

export const GlobalPlayerContext =
  createContext<GlobalPlayerContextType | null>(null)
