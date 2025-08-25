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
};
declare function MultiImageUploader({ imageFields, appendImage, removeImage, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, }: MultiImageUploaderProps): react_jsx_runtime.JSX.Element;

type ImageViewProps = {
    src: string;
    alt: string;
    canExpand?: boolean;
};
declare function ImageView({ src, alt, canExpand }: ImageViewProps): react_jsx_runtime.JSX.Element;

type TransformImageUrlFn = (storageId: string) => string;
declare const useImageView: () => {
    transformImageUrlFn: TransformImageUrlFn;
};

type ImageViewProviderProps = {
    transformImageUrlFn?: TransformImageUrlFn;
    children: react.ReactNode;
};
declare function ImageViewProvider({ transformImageUrlFn, children, }: ImageViewProviderProps): react_jsx_runtime.JSX.Element;

export { ImageView, ImageViewProvider, MultiImageUploader, type TransformImageUrlFn, useImageView };
