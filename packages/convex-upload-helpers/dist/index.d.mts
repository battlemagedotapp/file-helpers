import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { Id } from 'node_modules/convex/dist/esm-types/values/value';

type MultipleFileUploaderRenderProps = {
    isUploading: boolean;
    fileFields: {
        id: string;
        value: string;
    }[];
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleFileDelete: (index: number) => Promise<void>;
    triggerFileSelect: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    maxFiles: number;
    canAddMore: boolean;
    remainingSlots: number;
};
type MultipleFileUploaderProps = {
    fileFields: {
        id: string;
        value: string;
    }[];
    appendFile: (f: {
        value: string;
    }) => void;
    removeFile: (index: number) => void;
    maxFiles: number;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    children: (props: MultipleFileUploaderRenderProps) => React.ReactNode;
};
declare function MultipleFileUploader({ fileFields, appendFile, removeFile, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, children, }: MultipleFileUploaderProps): react_jsx_runtime.JSX.Element;

type SingleFileUploaderRenderProps = {
    isUploading: boolean;
    file?: {
        id: string;
        value: string;
    } | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleFileDelete: () => Promise<void>;
    triggerFileSelect: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    hasFile: boolean;
};
type SingleFileUploaderProps = {
    file?: {
        id: string;
        value: string;
    } | null;
    setFile: (f: {
        value: string;
    }) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    children: (props: SingleFileUploaderRenderProps) => React.ReactNode;
};
declare function SingleFileUploader({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, children, }: SingleFileUploaderProps): react_jsx_runtime.JSX.Element;

interface UseFileUploadConfig {
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    deleteSuccessMessage?: string;
    deleteErrorMessage?: string;
}
declare function useFileUpload(config?: UseFileUploadConfig): {
    uploadFile: (file: File) => Promise<string>;
    uploadMultipleFiles: (files: File[]) => Promise<string[]>;
    deleteFile: (args: {
        storageId: Id<"_storage">;
    }) => Promise<void>;
    isUploading: boolean;
    isDeleting: boolean;
};

type GenerateUploadUrlFunc = () => Promise<string>;
type SaveFileFunc = (args: {
    name: string;
    storageId: Id<'_storage'>;
    type: string;
    size: number;
}) => Promise<unknown>;
type DeleteFileFunc = (args: {
    storageId: Id<'_storage'>;
}) => Promise<unknown>;
interface FileUploadProviderProps {
    children: ReactNode;
    generateUploadUrl: GenerateUploadUrlFunc;
    saveFile: SaveFileFunc;
    deleteFile: DeleteFileFunc;
}
declare const FileUploadProvider: ({ children, generateUploadUrl, saveFile, deleteFile, }: FileUploadProviderProps) => react_jsx_runtime.JSX.Element;

export { FileUploadProvider, MultipleFileUploader, SingleFileUploader, useFileUpload };
