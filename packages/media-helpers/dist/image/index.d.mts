import { Crop } from 'react-image-crop';
import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';

interface ProcessedImageData {
    id: string;
    file: File;
    crop?: Crop;
    rotation: number;
}
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
declare function isImageTypeSupported(fileType: string): boolean;
declare function compressImage(file: File, options: CompressionOptions): Promise<File>;
declare function processImage(file: File, crop?: Crop, rotation?: number, compressionOptions?: CompressionOptions): Promise<File>;
declare function processImages(processedImages: ProcessedImageData[], compressionOptions?: CompressionOptions): Promise<File[]>;

interface ImageCropDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    files: File[];
    onUpload: (processedImages: {
        id: string;
        file: File;
        crop?: Crop;
        rotation: number;
    }[]) => void;
}
declare function ImageCropDialog({ open, onOpenChange, files, onUpload, }: ImageCropDialogProps): react_jsx_runtime.JSX.Element | null;

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

interface SingleImageCropDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File;
    onUpload: (processedImage: {
        id: string;
        file: File;
        crop?: Crop;
        rotation: number;
    }) => void;
}
declare function SingleImageCropDialog({ open, onOpenChange, file, onUpload, }: SingleImageCropDialogProps): react_jsx_runtime.JSX.Element | null;

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
declare const useImageView: () => {
    transformImageUrlFn: TransformImageUrlFn;
};

type ImageViewProviderProps = {
    transformImageUrlFn?: TransformImageUrlFn;
    children: react.ReactNode;
};
declare function ImageViewProvider({ transformImageUrlFn, children, }: ImageViewProviderProps): react_jsx_runtime.JSX.Element;

export { type CompressionOptions, ImageCropDialog, ImageView, ImageViewProvider, MultiImageCropUploader, MultiImageUploader, type ProcessedImageData, SingleImageCropDialog, SingleImageCropUploader, SingleImageUploader, type TransformImageUrlFn, compressImage, isImageTypeSupported, processImage, processImages, useImageView };
