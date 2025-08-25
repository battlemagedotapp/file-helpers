import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';

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
};
declare function ImageView({ src, alt, canExpand, className }: ImageViewProps): react_jsx_runtime.JSX.Element;

type TransformImageUrlFn = (storageId: string) => string;
declare const useImageView: () => {
    transformImageUrlFn: TransformImageUrlFn;
};

type ImageViewProviderProps = {
    transformImageUrlFn?: TransformImageUrlFn;
    children: react.ReactNode;
};
declare function ImageViewProvider({ transformImageUrlFn, children, }: ImageViewProviderProps): react_jsx_runtime.JSX.Element;

export { ImageView, ImageViewProvider, MultiImageUploader, SingleImageUploader, type TransformImageUrlFn, useImageView };
