import { useContext } from 'react'
import {
  GlobalPlayerContext,
  type GlobalPlayerContextType,
} from './GlobalPlayerContext'

export function useGlobalPlayer(): GlobalPlayerContextType {
  const context = useContext(GlobalPlayerContext)
  if (!context) {
    throw new Error(
      'useGlobalPlayer must be used within a GlobalPlayerProvider',
    )
  }
  return context
}
