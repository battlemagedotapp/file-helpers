import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type AudioSource = {
    mode: 'url';
    url: string;
    externalAudioUrlFn?: (url: string) => string;
} | {
    mode: 'blob';
    blob: Blob;
};
type AudioPlaybackProps = {
    src: AudioSource;
    externalAudioUrlFn?: (url: string) => string;
    trackId?: string;
    trackName?: string;
    initialVolume?: number;
    initialPlaybackRate?: number;
    initialCurrentTime?: number;
    initialPlaying?: boolean;
    className?: string;
    closePlayer?: () => void;
};
declare function AudioPlayback({ src, externalAudioUrlFn, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, closePlayer, }: AudioPlaybackProps): react_jsx_runtime.JSX.Element;

type AudioPlaybackWithBlobProps = {
    src: string;
    externalAudioUrlFn?: (url: string) => string;
    trackId?: string;
    trackName?: string;
    initialVolume?: number;
    initialPlaybackRate?: number;
    initialCurrentTime?: number;
    initialPlaying?: boolean;
    className?: string;
    closePlayer?: () => void;
};
declare function AudioPlaybackWithBlob({ src, externalAudioUrlFn, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, closePlayer, }: AudioPlaybackWithBlobProps): react_jsx_runtime.JSX.Element;

type GlobalPlayerState = {
    src: string;
    trackName?: string;
    currentTime: number;
    volume: number;
    playbackRate: number;
    timestamp: number;
};
type GlobalPlayerProps = {
    className?: string;
    externalAudioUrlFn?: (url: string) => string;
    playerState: GlobalPlayerState;
    onClose: () => void;
};
declare function GlobalPlayer({ className, externalAudioUrlFn, playerState, onClose, }: GlobalPlayerProps): react_jsx_runtime.JSX.Element;

declare function GlobalPlayerProvider({ children, externalAudioUrlFn, }: {
    children: ReactNode;
    externalAudioUrlFn?: (url: string) => string;
}): react_jsx_runtime.JSX.Element;

type GlobalPlayerContextType = {
    addToGlobalPlayer: (src: string, trackName?: string) => void;
    isGlobalPlayerVisible: boolean;
};

declare function useGlobalPlayer(): GlobalPlayerContextType;

type SingleAudioUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    externalAudioUrlFn?: (url: string) => string;
    closePlayer?: () => void;
};
declare function SingleAudioUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, externalAudioUrlFn, closePlayer, }: SingleAudioUploaderProps): react_jsx_runtime.JSX.Element;

export { AudioPlayback, AudioPlaybackWithBlob, GlobalPlayer, GlobalPlayerProvider, SingleAudioUploader, useGlobalPlayer };
