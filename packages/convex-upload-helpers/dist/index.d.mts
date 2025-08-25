import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { Id } from 'node_modules/convex/dist/esm-types/values/value';

type MultipleFileUploaderHeadlessRenderProps = {
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
type MultipleFileUploaderHeadlessProps = {
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
    children: (props: MultipleFileUploaderHeadlessRenderProps) => React.ReactNode;
};
declare function MultipleFileUploaderHeadless({ fileFields, appendFile, removeFile, maxFiles, maxSizeInMB, allowedTypes, successMessage, errorMessage, children, }: MultipleFileUploaderHeadlessProps): react_jsx_runtime.JSX.Element;

type SingleFileUploaderHeadlessRenderProps = {
    isUploading: boolean;
    file?: string | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleFileDelete: () => Promise<void>;
    triggerFileSelect: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    hasFile: boolean;
};
type SingleFileUploaderHeadlessProps = {
    file?: string | null;
    setFile: (f: string) => void;
    removeFile: () => void;
    maxSizeInMB?: number;
    allowedTypes?: string[];
    successMessage?: string;
    errorMessage?: string;
    children: (props: SingleFileUploaderHeadlessRenderProps) => React.ReactNode;
};
declare function SingleFileUploaderHeadless({ file, setFile, removeFile, maxSizeInMB, allowedTypes, successMessage, errorMessage, children, }: SingleFileUploaderHeadlessProps): react_jsx_runtime.JSX.Element;

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

export { FileUploadProvider, MultipleFileUploaderHeadless, SingleFileUploaderHeadless, useFileUpload };
