import * as react_jsx_runtime from 'react/jsx-runtime';
import react from 'react';

type ImageViewProps = {
    src: string;
    alt: string;
};
declare function ImageView({ src, alt }: ImageViewProps): react_jsx_runtime.JSX.Element;

type TransformImageUrlFn = (storageId: string) => string;
declare const useImageView: () => {
    transformImageUrlFn: TransformImageUrlFn;
};

type ImageViewProviderProps = {
    transformImageUrlFn?: TransformImageUrlFn;
    children: react.ReactNode;
};
declare function ImageViewProvider({ transformImageUrlFn, children, }: ImageViewProviderProps): react_jsx_runtime.JSX.Element;

export { ImageView, ImageViewProvider, type TransformImageUrlFn, useImageView };
