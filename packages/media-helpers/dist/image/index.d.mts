import * as react_jsx_runtime from 'react/jsx-runtime';
import { Crop } from 'react-image-crop';
import react from 'react';

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

interface ProcessedImageData {
    id: string;
    file: File;
    crop?: Crop;
    rotation: number;
}
declare function processImage(file: File, crop?: Crop, rotation?: number): Promise<File>;
declare function processImages(processedImages: ProcessedImageData[]): Promise<File[]>;

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
};
declare function MultiImageCropUploader({ imageFields, appendImage, removeImage, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, previewImageListClassName, previewImageItemClassName, }: MultiImageCropUploaderProps): react_jsx_runtime.JSX.Element;

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

export { ImageCropDialog, ImageView, ImageViewProvider, MultiImageCropUploader, MultiImageUploader, type ProcessedImageData, SingleImageUploader, type TransformImageUrlFn, processImage, processImages, useImageView };
