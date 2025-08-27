import * as react_jsx_runtime from 'react/jsx-runtime';

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
};
declare function AudioPlayback({ src, externalAudioUrlFn, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, }: AudioPlaybackProps): react_jsx_runtime.JSX.Element;

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
};
declare function AudioPlaybackWithBlob({ src, externalAudioUrlFn, trackId, trackName, initialVolume, initialPlaybackRate, initialCurrentTime, initialPlaying, className, }: AudioPlaybackWithBlobProps): react_jsx_runtime.JSX.Element;

type SingleAudioUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    compact?: boolean;
    externalAudioUrlFn?: (url: string) => string;
};
declare function SingleAudioUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, compact, externalAudioUrlFn, }: SingleAudioUploaderProps): react_jsx_runtime.JSX.Element;

export { AudioPlayback, AudioPlaybackWithBlob, SingleAudioUploader };
