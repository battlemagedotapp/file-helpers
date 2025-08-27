import { cn } from '@/lib/utils'
import WaveSurfer from 'wavesurfer.js'
import { AudioPlaybackWithBlob } from './AudioPlaybackWithBlob'

type GlobalPlayerState = {
  src: string
  trackName?: string
  currentTime: number
  volume: number
  playbackRate: number
  timestamp: number
}

type GlobalPlayerProps = {
  className?: string
  externalAudioUrlFn?: (url: string) => string
  playerState: GlobalPlayerState
  onClose: () => void
  onWavesurferReady?: (wavesurfer: WaveSurfer) => void
}

export function GlobalPlayer({
  className,
  externalAudioUrlFn,
  playerState,
  onClose,
  onWavesurferReady,
}: GlobalPlayerProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg',
        className,
      )}
    >
      <div className="w-full">
        <AudioPlaybackWithBlob
          src={playerState.src}
          externalAudioUrlFn={externalAudioUrlFn}
          trackName={playerState.trackName}
          initialVolume={playerState.volume}
          initialPlaybackRate={playerState.playbackRate}
          initialCurrentTime={playerState.currentTime}
          initialPlaying={false}
          closePlayer={onClose}
          onWavesurferReady={onWavesurferReady}
        />
      </div>
    </div>
  )
}
