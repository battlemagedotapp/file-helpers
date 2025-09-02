import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';

interface CompressionOptions {
    maxSizeMB: number;
    maxWidthOrHeight: number;
    useWebWorker?: boolean;
    onProgress?: (progress: number) => void;
    preserveExif?: boolean;
    signal?: AbortSignal;
    maxIteration?: number;
    exifOrientation?: number;
    fileType?: string;
    initialQuality?: number;
    alwaysKeepResolution?: boolean;
}

type MultiImageCropUploaderProps = {
    imageFields: {
        id: string;
        value: string;
    }[];
    appendImage: (f: {
        value: string;
    }) => void;
    removeImage: (index: number) => void;
    maxFiles: number;
    maxSizeInMB: number;
    allowedTypes: string[];
    successMessage: string;
    errorMessage: string;
    previewImageListClassName?: string;
    previewImageItemClassName?: string;
    compressionOptions?: CompressionOptions;
};
declare function MultiImageCropUploader({ imageFields, appendImage, removeImage, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, previewImageListClassName, previewImageItemClassName, compressionOptions, }: MultiImageCropUploaderProps): react_jsx_runtime.JSX.Element;

type MultiImageUploaderProps = {
    imageFields: {
        id: string;
        value: string;
    }[];
    appendImage: (f: {
        value: string;
    }) => void;
    removeImage: (index: number) => void;
    maxFiles: number;
    maxSizeInMB: number;
    allowedTypes: string[];
    successMessage: string;
    errorMessage: string;
    previewImageListClassName?: string;
    previewImageItemClassName?: string;
};
declare function MultiImageUploader({ imageFields, appendImage, removeImage, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, previewImageListClassName, previewImageItemClassName, }: MultiImageUploaderProps): react_jsx_runtime.JSX.Element;

type SingleImageCropUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    imageClassName?: string;
    compressionOptions?: CompressionOptions;
};
declare function SingleImageCropUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, imageClassName, compressionOptions, }: SingleImageCropUploaderProps): react_jsx_runtime.JSX.Element;

type SingleImageUploaderProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    imageClassName?: string;
};
declare function SingleImageUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, className, imageClassName, }: SingleImageUploaderProps): react_jsx_runtime.JSX.Element;

type ImageViewProps = {
    src: string;
    alt: string;
    canExpand?: boolean;
    className?: string;
    externalImageUrlFn?: (url: string) => string;
};
declare function ImageView({ src, alt, canExpand, className, externalImageUrlFn, }: ImageViewProps): react_jsx_runtime.JSX.Element;

type TransformImageUrlFn = (storageId: string) => string;

type ImageViewProviderProps = {
    transformImageUrlFn?: TransformImageUrlFn;
    children: react.ReactNode;
};
declare function ImageViewProvider({ transformImageUrlFn, children, }: ImageViewProviderProps): react_jsx_runtime.JSX.Element;

export { ImageView, ImageViewProvider, MultiImageCropUploader, MultiImageUploader, SingleImageCropUploader, SingleImageUploader };
