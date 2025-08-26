import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';

type AudioPlayerProps = {
    src: string;
    className?: string;
    externalAudioUrlFn?: (url: string) => string;
    compact?: boolean;
};
declare function AudioPlayer({ src, className, externalAudioUrlFn, compact, }: AudioPlayerProps): react_jsx_runtime.JSX.Element;

type TransformAudioUrlFn = (storageId: string) => string;

type AudioPlayerProviderProps = {
    transformAudioUrlFn?: TransformAudioUrlFn;
    children: react.ReactNode;
};
declare function AudioPlayerProvider({ transformAudioUrlFn, children, }: AudioPlayerProviderProps): react_jsx_runtime.JSX.Element;

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

export { AudioPlayer, AudioPlayerProvider, SingleAudioUploader };
