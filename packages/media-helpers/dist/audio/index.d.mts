import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';
import WaveSurfer from 'wavesurfer.js';

type TransformAudioUrlFn = (storageId: string) => string;

type AudioPlayerProviderProps = {
    transformAudioUrlFn?: TransformAudioUrlFn;
    children: react.ReactNode;
};
declare function AudioPlayerProvider({ transformAudioUrlFn, children, }: AudioPlayerProviderProps): react_jsx_runtime.JSX.Element;

type WaveSurferOptions = {
    container: HTMLElement;
    waveColor?: string;
    progressColor?: string;
    cursorColor?: string;
    barWidth?: number;
    barRadius?: number;
    cursorWidth?: number;
    height?: number;
    barGap?: number;
    responsive?: boolean;
    normalize?: boolean;
    partialRender?: boolean;
    zoom?: number;
    plugins?: any[];
};
type UseWaveSurferReturn = {
    wavesurfer: WaveSurfer | null;
    isReady: boolean;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isLoading: boolean;
    error: string | null;
    play: () => Promise<void>;
    pause: () => void;
    setTime: (time: number) => void;
    setVolume: (volume: number) => void;
    setPlaybackRate: (rate: number) => void;
    zoom: (level: number) => void;
    loadBlob: (blob: Blob) => Promise<void>;
    destroy: () => void;
};

type WaveSurferAudioPlayerProps = {
    src: string;
    className?: string;
    externalAudioUrlFn?: (url: string) => string;
    compact?: boolean;
};
declare function WaveSurferAudioPlayer({ src, className, externalAudioUrlFn, compact, }: WaveSurferAudioPlayerProps): react_jsx_runtime.JSX.Element;

type SingleAudioUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    audioClassName?: string;
    compact?: boolean;
};
declare function SingleAudioUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, audioClassName, compact, }: SingleAudioUploaderProps): react_jsx_runtime.JSX.Element;

export { AudioPlayerProvider, SingleAudioUploader, type UseWaveSurferReturn, WaveSurferAudioPlayer, type WaveSurferOptions };
