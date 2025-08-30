import * as react_jsx_runtime from 'react/jsx-runtime';
import WaveSurfer from 'wavesurfer.js';
import { ReactNode } from 'react';

type AudioSource$1 = {
    mode: 'url';
    url: string;
    externalAudioUrlFn?: (url: string) => string;
} | {
    mode: 'blob';
    blob: Blob;
};
type AudioPlaybackProps = {
    src: AudioSource$1;
    trackId?: string;
    trackName?: string;
    initialVolume?: number;
    initialPlaybackRate?: number;
    initialCurrentTime?: number;
    initialPlaying?: boolean;
    className?: string;
    closePlayer?: () => void;
    onWavesurferReady?: (wavesurfer: WaveSurfer) => void;
};
declare function AudioPlayback({ src, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, closePlayer, onWavesurferReady, }: AudioPlaybackProps): react_jsx_runtime.JSX.Element;

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
    onWavesurferReady?: (wavesurfer: WaveSurfer) => void;
};
declare function AudioPlaybackWithBlob({ src, externalAudioUrlFn, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, closePlayer, onWavesurferReady, }: AudioPlaybackWithBlobProps): react_jsx_runtime.JSX.Element;

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
    onWavesurferReady?: (wavesurfer: WaveSurfer) => void;
};
declare function GlobalPlayer({ className, externalAudioUrlFn, playerState, onClose, onWavesurferReady, }: GlobalPlayerProps): react_jsx_runtime.JSX.Element;

declare function GlobalPlayerProvider({ children, externalAudioUrlFn, }: {
    children: ReactNode;
    externalAudioUrlFn?: (url: string) => string;
}): react_jsx_runtime.JSX.Element;

type GlobalPlayerContextType = {
    addToGlobalPlayer: (src: string, trackName?: string) => void;
    isGlobalPlayerVisible: boolean;
};

declare function useGlobalPlayer(): GlobalPlayerContextType;

type AudioTrimDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File;
    onUpload: (processedAudio: {
        id: string;
        file: File;
        trimRegion?: {
            start: number;
            end: number;
        };
    }) => void;
};
declare function AudioTrimDialog({ open, onOpenChange, file, onUpload, }: AudioTrimDialogProps): react_jsx_runtime.JSX.Element;

declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
    }
}
type AudioSource = {
    mode: 'url';
    url: string;
    externalAudioUrlFn?: (url: string) => string;
} | {
    mode: 'blob';
    blob: Blob;
};
type AudioTrimPlaybackProps = {
    src: AudioSource;
    className?: string;
    onTrim?: (regionTimestamps: {
        start: number;
        end: number;
    }) => void;
    onTrimModeChange?: (isTrimMode: boolean) => void;
};
declare function AudioTrimPlayback({ src, className, onTrim, onTrimModeChange, }: AudioTrimPlaybackProps): react_jsx_runtime.JSX.Element;

type AudioTrimPlaybackWithBlobProps = {
    src: string;
    externalAudioUrlFn?: (url: string) => string;
    onTrim?: (regionTimestamps: {
        start: number;
        end: number;
    }) => void;
    onTrimmedBlobChange?: (blob: Blob | null) => void;
    onTrimModeChange?: (isTrimMode: boolean) => void;
};
declare function AudioTrimPlaybackWithBlob({ src, externalAudioUrlFn, onTrim, onTrimmedBlobChange, onTrimModeChange, }: AudioTrimPlaybackWithBlobProps): react_jsx_runtime.JSX.Element;

type AudioTrimUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    externalAudioUrlFn?: (url: string) => string;
};
declare function AudioTrimUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, externalAudioUrlFn, }: AudioTrimUploaderProps): react_jsx_runtime.JSX.Element;

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

export { AudioPlayback, AudioPlaybackWithBlob, AudioTrimDialog, AudioTrimPlayback, AudioTrimPlaybackWithBlob, AudioTrimUploader, GlobalPlayer, GlobalPlayerProvider, SingleAudioUploader, useGlobalPlayer };
