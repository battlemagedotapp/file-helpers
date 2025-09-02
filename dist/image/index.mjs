import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  cn
} from "../chunk-S7NXKG6U.mjs";
import "../chunk-PMJAV4JJ.mjs";

// src/image/view/ImageViewProviderContext.tsx
import { createContext, useContext } from "react";
var defaultTransform = (storageId) => storageId;
var ImageViewContext = createContext({
  transformImageUrlFn: defaultTransform
});
var useImageView = () => useContext(ImageViewContext);
var ImageViewProviderContext_default = ImageViewContext;

// src/image/view/ImageView.tsx
import { Ellipsis, X } from "lucide-react";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { jsx, jsxs } from "react/jsx-runtime";
function ImageView({
  src,
  alt,
  canExpand = true,
  className,
  externalImageUrlFn
}) {
  const [status, setStatus] = useState(
    "loading"
  );
  const [imgClassNames, setImgClassNames] = useState({
    width: "100%",
    height: "100%",
    objectFit: "cover"
  });
  const [isOpen, setIsOpen] = useState(false);
  const { transformImageUrlFn } = useImageView();
  const imageSrc = externalImageUrlFn ? externalImageUrlFn(src) : transformImageUrlFn(src);
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full h-full relative select-none", className), children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imageSrc,
        alt,
        style: imgClassNames,
        className: canExpand ? "hover:cursor-pointer" : "",
        onClick: () => {
          if (canExpand && status === "loaded") setIsOpen(true);
        },
        onLoad: () => {
          setStatus("loaded");
          setImgClassNames({
            width: "100%",
            height: "100%",
            objectFit: "cover"
          });
        },
        onError: () => {
          setStatus("error");
          setImgClassNames({
            width: "0",
            height: "0",
            objectFit: "cover"
          });
        }
      }
    ),
    status === "loading" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(Ellipsis, { className: "h-4 w-4 animate-pulse" }) }),
    status === "error" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
    isOpen && status === "loaded" && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0  backdrop-blur-2xl z-50 flex items-center justify-center",
        onClick: () => setIsOpen(false),
        children: /* @__PURE__ */ jsx(
          TransformWrapper,
          {
            wheel: { step: 0.5 },
            pinch: { disabled: false },
            doubleClick: { disabled: true },
            children: /* @__PURE__ */ jsx(
              TransformComponent,
              {
                wrapperStyle: { width: "100%", height: "100%" },
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative max-w-full max-h-full p-4",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          type: "button",
                          variant: "secondary",
                          size: "icon",
                          className: "cursor-pointer absolute top-2 right-2 hover:bg-primary hover:text-primary-foreground",
                          onClick: () => setIsOpen(false),
                          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: imageSrc,
                          alt,
                          className: "max-w-[90vw] max-h-[90vh] object-contain"
                        }
                      )
                    ]
                  }
                )
              }
            )
          }
        )
      }
    )
  ] });
}

// src/image/uploader/multiple-image/MultiImageCropUploader.tsx
import { useFileUpload } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus, LoaderCircle, Trash } from "lucide-react";
import { useRef as useRef2, useState as useState3 } from "react";
import { toast } from "sonner";

// src/image/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs2(AlertDialog, { children: [
    trigger ? typeof trigger === "function" ? /* @__PURE__ */ jsx2(AlertDialogTrigger, { asChild: true, children: trigger({}) }) : /* @__PURE__ */ jsx2(AlertDialogTrigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs2(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs2(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx2(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx2(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs2(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx2(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx2(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/image/uploader/imageProcessingUtils.ts
import imageCompression from "browser-image-compression";
import "react-image-crop";
var SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/bmp"
];
function isImageTypeSupported(fileType) {
  return SUPPORTED_IMAGE_TYPES.includes(fileType.toLowerCase());
}
async function compressImage(file, options) {
  if (!isImageTypeSupported(file.type)) {
    console.log(
      `Skipping compression for ${file.name} (${file.type}) - type not supported`
    );
    return file;
  }
  try {
    console.log(`Compressing ${file.name} (${file.type})`);
    const compressedFile = await imageCompression(file, options);
    console.log(`Successfully compressed ${file.name}`);
    return compressedFile;
  } catch (error) {
    console.warn(
      `Failed to compress ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return file;
  }
}
function processImage(file, crop, rotation = 0, compressionOptions) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        const rotatedWidth = rotation % 180 === 0 ? img.width : img.height;
        const rotatedHeight = rotation % 180 === 0 ? img.height : img.width;
        canvas.width = rotatedWidth;
        canvas.height = rotatedHeight;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        if (crop && crop.width > 0 && crop.height > 0) {
          const cropCanvas = document.createElement("canvas");
          const cropCtx = cropCanvas.getContext("2d");
          if (!cropCtx) {
            reject(new Error("Could not get crop canvas context"));
            return;
          }
          const cropX = crop.x * rotatedWidth / 100;
          const cropY = crop.y * rotatedHeight / 100;
          const cropWidth = crop.width * rotatedWidth / 100;
          const cropHeight = crop.height * rotatedHeight / 100;
          cropCanvas.width = cropWidth;
          cropCanvas.height = cropHeight;
          cropCtx.drawImage(
            canvas,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
          );
          cropCanvas.toBlob(
            async (blob) => {
              if (blob) {
                let processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                if (compressionOptions) {
                  processedFile = await compressImage(
                    processedFile,
                    compressionOptions
                  );
                }
                resolve(processedFile);
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            file.type,
            0.9
          );
        } else {
          canvas.toBlob(
            async (blob) => {
              if (blob) {
                let processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                if (compressionOptions) {
                  processedFile = await compressImage(
                    processedFile,
                    compressionOptions
                  );
                }
                resolve(processedFile);
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            file.type,
            0.9
          );
        }
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}
async function processImages(processedImages, compressionOptions) {
  const processedFiles = await Promise.all(
    processedImages.map(
      ({ file, crop, rotation }) => processImage(file, crop, rotation, compressionOptions)
    )
  );
  return processedFiles;
}

// src/image/uploader/multiple-image/ImageCropDialog.tsx
import { RotateCw, Upload, X as X2 } from "lucide-react";
import React2, { useCallback, useRef, useState as useState2 } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ImageCropDialog({
  open,
  onOpenChange,
  files,
  onUpload
}) {
  const [images, setImages] = useState2([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState2(0);
  const [crops, setCrops] = useState2([]);
  const [rotations, setRotations] = useState2([]);
  const imgRefs = useRef([]);
  const createRotatedImage = useCallback(
    (imageUrl, rotation) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const isVertical = rotation % 180 === 90;
          const width = isVertical ? img.height : img.width;
          const height = isVertical ? img.width : img.height;
          canvas.width = width;
          canvas.height = height;
          ctx.translate(width / 2, height / 2);
          ctx.rotate(rotation * Math.PI / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          const rotatedUrl = canvas.toDataURL("image/jpeg", 0.9);
          resolve(rotatedUrl);
        };
        img.src = imageUrl;
      });
    },
    []
  );
  React2.useEffect(() => {
    if (files.length > 0) {
      const newImages = files.map((file, index) => ({
        id: `img-${index}`,
        file,
        url: URL.createObjectURL(file),
        rotatedUrl: "",
        rotation: 0
      }));
      setImages(newImages);
      setCrops(new Array(files.length).fill(void 0));
      setRotations(new Array(files.length).fill(0));
      setSelectedImageIndex(0);
      imgRefs.current = new Array(files.length).fill(null);
    }
  }, [files]);
  React2.useEffect(() => {
    const initializeRotatedImages = async () => {
      const updatedImages = await Promise.all(
        images.map(async (image) => {
          const freshUrl = URL.createObjectURL(image.file);
          try {
            const rotatedUrl = await createRotatedImage(
              freshUrl,
              image.rotation
            );
            return { ...image, rotatedUrl };
          } finally {
            URL.revokeObjectURL(freshUrl);
          }
        })
      );
      setImages(updatedImages);
    };
    if (images.length > 0 && images[0].rotatedUrl === "") {
      initializeRotatedImages();
    }
  }, [images, createRotatedImage]);
  const updateRotatedImage = useCallback(
    async (index, newRotation) => {
      setImages((prev) => {
        const image = prev[index];
        if (image) {
          const freshUrl = URL.createObjectURL(image.file);
          createRotatedImage(freshUrl, newRotation).then((rotatedUrl) => {
            URL.revokeObjectURL(freshUrl);
            setImages((currentImages) => {
              const newImages = [...currentImages];
              newImages[index] = {
                ...newImages[index],
                rotatedUrl,
                rotation: newRotation
              };
              return newImages;
            });
          }).catch(() => {
            URL.revokeObjectURL(freshUrl);
          });
        }
        return prev;
      });
    },
    [createRotatedImage]
  );
  React2.useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [images]);
  const handleCropChange = useCallback(
    (crop, percentCrop, index) => {
      setCrops((prev) => {
        const newCrops = [...prev];
        newCrops[index] = percentCrop;
        return newCrops;
      });
    },
    []
  );
  const handleRotate = useCallback(
    (index) => {
      const newRotation = (rotations[index] + 90) % 360;
      setRotations((prev) => {
        const newRotations = [...prev];
        newRotations[index] = newRotation;
        return newRotations;
      });
      updateRotatedImage(index, newRotation);
    },
    [rotations, updateRotatedImage]
  );
  const handleUnselectCrop = useCallback((index) => {
    setCrops((prev) => {
      const newCrops = [...prev];
      newCrops[index] = void 0;
      return newCrops;
    });
  }, []);
  const handleRemoveImage = useCallback(
    (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setCrops((prev) => prev.filter((_, i) => i !== index));
      setRotations((prev) => prev.filter((_, i) => i !== index));
      if (selectedImageIndex >= index && selectedImageIndex > 0) {
        setSelectedImageIndex((prev) => prev - 1);
      } else if (selectedImageIndex === index && index === images.length - 1) {
        setSelectedImageIndex((prev) => Math.max(0, prev - 1));
      }
    },
    [selectedImageIndex, images.length]
  );
  const handleUpload = useCallback(() => {
    const processedImages = images.map((image, index) => ({
      id: image.id,
      file: image.file,
      crop: crops[index],
      rotation: rotations[index]
    }));
    onUpload(processedImages);
    onOpenChange(false);
  }, [images, crops, rotations, onUpload, onOpenChange]);
  const selectedImage = images[selectedImageIndex];
  const selectedCrop = crops[selectedImageIndex];
  if (images.length === 0) return null;
  return /* @__PURE__ */ jsx3(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs3(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsx3(DialogHeader, { children: /* @__PURE__ */ jsx3(DialogTitle, { children: "Edit Images" }) }),
    /* @__PURE__ */ jsxs3("div", { className: "flex-1 flex flex-col gap-4 overflow-hidden select-none", children: [
      /* @__PURE__ */ jsx3("div", { className: "shrink-0 flex flex-row gap-2 h-24 overflow-x-auto pb-2", children: images.map((image, index) => /* @__PURE__ */ jsxs3(
        "div",
        {
          className: cn(
            "relative shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden",
            selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
          ),
          onClick: () => setSelectedImageIndex(index),
          children: [
            /* @__PURE__ */ jsx3(
              "img",
              {
                src: image.rotatedUrl || image.url,
                alt: `Image ${index + 1}`,
                className: "aspect-square h-full object-contain"
              }
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "icon",
                className: "absolute top-1 right-1 h-6 w-6",
                onClick: (e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                },
                children: /* @__PURE__ */ jsx3(X2, { className: "h-3 w-3" })
              }
            )
          ]
        },
        image.id
      )) }),
      /* @__PURE__ */ jsxs3("div", { className: "flex-1 flex flex-col gap-4 overflow-hidden", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs3("h3", { className: "text-sm font-medium", children: [
            "Image ",
            selectedImageIndex + 1,
            " of ",
            images.length
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx3(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => handleUnselectCrop(selectedImageIndex),
                disabled: !selectedCrop,
                children: "Unselect"
              }
            ),
            /* @__PURE__ */ jsxs3(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => handleRotate(selectedImageIndex),
                children: [
                  /* @__PURE__ */ jsx3(RotateCw, { className: "h-4 w-4" }),
                  "Rotate"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx3(
          "div",
          {
            style: {
              height: "100%",
              overflow: "scroll"
            },
            children: selectedImage && /* @__PURE__ */ jsx3(
              ReactCrop,
              {
                crop: selectedCrop,
                onChange: (crop, percentCrop) => handleCropChange(crop, percentCrop, selectedImageIndex),
                aspect: void 0,
                minWidth: 5,
                minHeight: 5,
                keepSelection: true,
                children: /* @__PURE__ */ jsx3(
                  "img",
                  {
                    ref: (el) => {
                      imgRefs.current[selectedImageIndex] = el;
                    },
                    src: selectedImage.rotatedUrl || selectedImage.url,
                    alt: `Selected image ${selectedImageIndex + 1}`,
                    className: "h-full w-auto object-contain"
                  }
                )
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs3(DialogFooter, { children: [
      /* @__PURE__ */ jsx3(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => onOpenChange(false),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxs3(
        Button,
        {
          type: "button",
          onClick: handleUpload,
          disabled: images.length === 0,
          children: [
            /* @__PURE__ */ jsx3(Upload, { className: "h-4 w-4" }),
            "Upload All (",
            images.length,
            ")"
          ]
        }
      )
    ] })
  ] }) });
}

// src/image/uploader/multiple-image/MultiImageCropUploader.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function MultiImageCropUploader({
  imageFields,
  appendImage,
  removeImage,
  maxFiles,
  maxSizeInMB,
  allowedTypes,
  successMessage,
  errorMessage,
  previewImageListClassName,
  previewImageItemClassName,
  compressionOptions
}) {
  const [cropDialogOpen, setCropDialogOpen] = useState3(false);
  const [pendingFiles, setPendingFiles] = useState3([]);
  const [isUploading, setIsUploading] = useState3(false);
  const fileInputRef = useRef2(null);
  const { uploadFile, deleteFile } = useFileUpload({
    maxSizeInMB,
    allowedTypes,
    successMessage,
    errorMessage
  });
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);
    const remaining = Math.max(0, maxFiles - imageFields.length);
    if (remaining <= 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (filesArray.length > remaining) {
      filesArray.splice(remaining);
    }
    setPendingFiles(filesArray);
    setCropDialogOpen(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleCropDialogUpload = async (processedImages) => {
    try {
      setIsUploading(true);
      const processedFiles = await processImages(
        processedImages,
        compressionOptions
      );
      for (const file of processedFiles) {
        const storageId = await uploadFile(file);
        appendImage({ value: storageId });
      }
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process images"
      );
    } finally {
      setIsUploading(false);
    }
  };
  const handleFileDelete = async (index) => {
    try {
      const storageId = imageFields[index].value;
      if (storageId && !storageId.startsWith("data:")) {
        await deleteFile({ storageId });
      }
      removeImage(index);
    } catch (error) {
      console.error("Error deleting file:", error);
      removeImage(index);
    }
  };
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  const canAddMore = imageFields.length < maxFiles;
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx4(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          multiple: true,
          onChange: handleFileSelect,
          className: "hidden",
          accept: allowedTypes.join(",")
        }
      ),
      /* @__PURE__ */ jsxs4(
        Button,
        {
          disabled: isUploading || !canAddMore,
          variant: "default",
          size: "default",
          className: "w-fit",
          onClick: triggerFileSelect,
          children: [
            isUploading ? /* @__PURE__ */ jsx4(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx4(ImagePlus, { className: "h-4 w-4" }),
            isUploading ? "Uploading..." : "Add image(s)"
          ]
        }
      ),
      /* @__PURE__ */ jsxs4("p", { className: "text-sm text-muted-foreground", children: [
        "Maximum ",
        maxFiles,
        " images allowed"
      ] }),
      imageFields.length > 0 && /* @__PURE__ */ jsx4(
        "div",
        {
          className: cn(
            "flex flex-row flex-nowrap h-64 overflow-x-scroll show-scrollbar",
            previewImageListClassName
          ),
          children: imageFields.map((field, index) => /* @__PURE__ */ jsxs4(
            "div",
            {
              className: "shrink-0 h-full relative aspect-square p-4",
              children: [
                /* @__PURE__ */ jsx4(
                  ImageView,
                  {
                    src: field.value,
                    alt: `Image ${index + 1}`,
                    className: cn(
                      "rounded-lg overflow-hidden",
                      previewImageItemClassName
                    )
                  }
                ),
                /* @__PURE__ */ jsx4("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx4(
                  ConfirmAlertDialog_default,
                  {
                    trigger: (props) => /* @__PURE__ */ jsx4(
                      Button,
                      {
                        ...props,
                        type: "button",
                        variant: "secondary",
                        size: "icon",
                        className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                        children: /* @__PURE__ */ jsx4(Trash, { className: "h-4 w-4" })
                      }
                    ),
                    title: "Delete image",
                    description: "Are you sure you want to delete this image? This action cannot be undone.",
                    confirmLabel: "Delete",
                    cancelLabel: "Cancel",
                    onConfirm: () => handleFileDelete(index)
                  }
                ) })
              ]
            },
            field.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsx4(
      ImageCropDialog,
      {
        open: cropDialogOpen,
        onOpenChange: setCropDialogOpen,
        files: pendingFiles,
        onUpload: handleCropDialogUpload
      }
    )
  ] });
}

// src/image/uploader/multiple-image/MultiImageUploader.tsx
import { MultipleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus as ImagePlus2, LoaderCircle as LoaderCircle2, Trash as Trash2 } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function MultiImageUploader({
  imageFields,
  appendImage,
  removeImage,
  maxFiles,
  maxSizeInMB,
  allowedTypes,
  successMessage,
  errorMessage,
  previewImageListClassName,
  previewImageItemClassName
}) {
  return /* @__PURE__ */ jsx5(
    MultipleFileUploaderHeadless,
    {
      fileFields: imageFields,
      appendFile: appendImage,
      removeFile: removeImage,
      maxFiles,
      maxSizeInMB,
      allowedTypes,
      successMessage,
      errorMessage,
      children: ({ isUploading, triggerFileSelect, handleFileDelete, canAddMore }) => /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs5(
          Button,
          {
            disabled: isUploading || !canAddMore,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx5(LoaderCircle2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx5(ImagePlus2, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add image(s)"
            ]
          }
        ),
        /* @__PURE__ */ jsxs5("p", { className: "text-sm text-muted-foreground", children: [
          "Maximum ",
          maxFiles,
          " images allowed"
        ] }),
        imageFields.length > 0 && /* @__PURE__ */ jsx5(
          "div",
          {
            className: cn(
              "flex flex-row flex-nowrap h-64 overflow-x-scroll show-scrollbar",
              previewImageListClassName
            ),
            children: imageFields.map((field, index) => /* @__PURE__ */ jsxs5(
              "div",
              {
                className: "shrink-0 h-full relative aspect-square p-4",
                children: [
                  /* @__PURE__ */ jsx5(
                    ImageView,
                    {
                      src: field.value,
                      alt: `Image ${index + 1}`,
                      className: cn(
                        "rounded-lg overflow-hidden",
                        previewImageItemClassName
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx5("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx5(
                    ConfirmAlertDialog_default,
                    {
                      trigger: (props) => /* @__PURE__ */ jsx5(
                        Button,
                        {
                          ...props,
                          type: "button",
                          variant: "secondary",
                          size: "icon",
                          className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                          children: /* @__PURE__ */ jsx5(Trash2, { className: "h-4 w-4" })
                        }
                      ),
                      title: "Delete image",
                      description: "Are you sure you want to delete this image? This action cannot be undone.",
                      confirmLabel: "Delete",
                      cancelLabel: "Cancel",
                      onConfirm: () => handleFileDelete(index)
                    }
                  ) })
                ]
              },
              field.id
            ))
          }
        )
      ] })
    }
  );
}

// src/image/uploader/single-image/SingleImageCropUploader.tsx
import { useFileUpload as useFileUpload2 } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus as ImagePlus3, LoaderCircle as LoaderCircle3, Trash as Trash3 } from "lucide-react";
import { useRef as useRef4, useState as useState5 } from "react";
import { toast as toast2 } from "sonner";

// src/image/uploader/single-image/SingleImageCropDialog.tsx
import { RotateCw as RotateCw2, Upload as Upload2 } from "lucide-react";
import React3, { useCallback as useCallback2, useRef as useRef3, useState as useState4 } from "react";
import ReactCrop2 from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function SingleImageCropDialog({
  open,
  onOpenChange,
  file,
  onUpload
}) {
  const [imageUrl, setImageUrl] = useState4("");
  const [rotatedImageUrl, setRotatedImageUrl] = useState4("");
  const [crop, setCrop] = useState4();
  const [rotation, setRotation] = useState4(0);
  const imgRef = useRef3(null);
  React3.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  const createRotatedImage = useCallback2(
    (imageUrl2, rotation2) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const isVertical = rotation2 % 180 === 90;
          const width = isVertical ? img.height : img.width;
          const height = isVertical ? img.width : img.height;
          canvas.width = width;
          canvas.height = height;
          ctx.translate(width / 2, height / 2);
          ctx.rotate(rotation2 * Math.PI / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          const rotatedUrl = canvas.toDataURL("image/jpeg", 0.9);
          resolve(rotatedUrl);
        };
        img.src = imageUrl2;
      });
    },
    []
  );
  React3.useEffect(() => {
    if (imageUrl) {
      createRotatedImage(imageUrl, rotation).then(setRotatedImageUrl);
    }
  }, [imageUrl, rotation, createRotatedImage]);
  const handleCropChange = useCallback2(
    (newCrop, percentCrop) => {
      setCrop(percentCrop);
    },
    []
  );
  const handleRotate = useCallback2(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);
  const handleUnselectCrop = useCallback2(() => {
    setCrop(void 0);
  }, []);
  const handleUpload = useCallback2(() => {
    const processedImage = {
      id: `img-0`,
      file,
      crop,
      rotation
    };
    onUpload(processedImage);
    onOpenChange(false);
  }, [file, crop, rotation, onUpload, onOpenChange]);
  if (!file) return null;
  return /* @__PURE__ */ jsx6(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs6(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsx6(DialogHeader, { children: /* @__PURE__ */ jsx6(DialogTitle, { children: "Edit Image" }) }),
    /* @__PURE__ */ jsxs6("div", { className: "flex-1 flex flex-col gap-4 overflow-hidden select-none", children: [
      /* @__PURE__ */ jsx6("div", { className: "flex items-center justify-start", children: /* @__PURE__ */ jsxs6("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx6(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleUnselectCrop,
            disabled: !crop,
            children: "Unselect"
          }
        ),
        /* @__PURE__ */ jsxs6(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleRotate,
            children: [
              /* @__PURE__ */ jsx6(RotateCw2, { className: "h-4 w-4" }),
              "Rotate"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx6(
        "div",
        {
          style: {
            height: "100%",
            overflow: "scroll"
          },
          children: rotatedImageUrl && /* @__PURE__ */ jsx6(
            ReactCrop2,
            {
              crop,
              onChange: handleCropChange,
              aspect: void 0,
              minWidth: 5,
              minHeight: 5,
              keepSelection: true,
              children: /* @__PURE__ */ jsx6(
                "img",
                {
                  ref: imgRef,
                  src: rotatedImageUrl,
                  alt: "Image to crop",
                  className: "h-full w-auto object-contain"
                }
              )
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs6(DialogFooter, { children: [
      /* @__PURE__ */ jsx6(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => onOpenChange(false),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxs6(Button, { type: "button", onClick: handleUpload, children: [
        /* @__PURE__ */ jsx6(Upload2, { className: "h-4 w-4" }),
        "Upload"
      ] })
    ] })
  ] }) });
}

// src/image/uploader/single-image/SingleImageCropUploader.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function SingleImageCropUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = "File uploaded successfully!",
  errorMessage = "Failed to upload file",
  className,
  imageClassName,
  compressionOptions
}) {
  const [cropDialogOpen, setCropDialogOpen] = useState5(false);
  const [pendingFile, setPendingFile] = useState5(null);
  const [isUploading, setIsUploading] = useState5(false);
  const fileInputRef = useRef4(null);
  const { uploadFile, deleteFile } = useFileUpload2({
    maxSizeInMB,
    allowedTypes,
    successMessage,
    errorMessage
  });
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);
    const selectedFile = filesArray[0];
    setPendingFile(selectedFile);
    setCropDialogOpen(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleCropDialogUpload = async (processedImage) => {
    try {
      setIsUploading(true);
      const processedFile = await processImage(
        processedImage.file,
        processedImage.crop,
        processedImage.rotation,
        compressionOptions
      );
      const storageId = await uploadFile(processedFile);
      setFile(storageId);
    } catch (error) {
      console.error("Error processing image:", error);
      toast2.error(
        error instanceof Error ? error.message : "Failed to process image"
      );
    } finally {
      setIsUploading(false);
    }
  };
  const handleFileDelete = async () => {
    try {
      if (file && !file.startsWith("data:")) {
        await deleteFile({ storageId: file });
      }
      removeFile();
    } catch (error) {
      console.error("Error deleting file:", error);
      removeFile();
    }
  };
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  const hasFile = !!file;
  return /* @__PURE__ */ jsxs7(Fragment2, { children: [
    /* @__PURE__ */ jsxs7("div", { className: cn("relative", className), children: [
      /* @__PURE__ */ jsx7(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          onChange: handleFileSelect,
          className: "hidden",
          accept: allowedTypes.join(",")
        }
      ),
      !hasFile && /* @__PURE__ */ jsxs7(
        Button,
        {
          disabled: isUploading,
          variant: "default",
          size: "default",
          className: "w-fit",
          onClick: triggerFileSelect,
          children: [
            isUploading ? /* @__PURE__ */ jsx7(LoaderCircle3, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx7(ImagePlus3, { className: "h-4 w-4" }),
            isUploading ? "Uploading..." : "Add image"
          ]
        }
      ),
      file && /* @__PURE__ */ jsxs7("div", { className: "relative p-4 w-fit", children: [
        /* @__PURE__ */ jsx7(
          ImageView,
          {
            src: file,
            alt: "Uploaded image",
            className: cn("rounded-lg overflow-hidden", imageClassName)
          }
        ),
        /* @__PURE__ */ jsx7("div", { className: "absolute top-0 right-0", children: /* @__PURE__ */ jsx7(
          ConfirmAlertDialog_default,
          {
            trigger: (props) => /* @__PURE__ */ jsx7(
              Button,
              {
                ...props,
                type: "button",
                variant: "secondary",
                size: "icon",
                className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                children: /* @__PURE__ */ jsx7(Trash3, { className: "h-4 w-4" })
              }
            ),
            title: "Delete image",
            description: "Are you sure you want to delete this image? This action cannot be undone.",
            confirmLabel: "Delete",
            cancelLabel: "Cancel",
            onConfirm: handleFileDelete
          }
        ) })
      ] })
    ] }),
    pendingFile && /* @__PURE__ */ jsx7(
      SingleImageCropDialog,
      {
        open: cropDialogOpen,
        onOpenChange: setCropDialogOpen,
        file: pendingFile,
        onUpload: handleCropDialogUpload
      }
    )
  ] });
}

// src/image/uploader/single-image/SingleImageUploader.tsx
import { SingleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus as ImagePlus4, LoaderCircle as LoaderCircle4, Trash as Trash4 } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function SingleImageUploader({
  file,
  setFile,
  removeFile,
  maxSizeInMB,
  allowedTypes = [],
  successMessage = "File uploaded successfully!",
  errorMessage = "Failed to upload file",
  className,
  imageClassName
}) {
  return /* @__PURE__ */ jsx8(
    SingleFileUploaderHeadless,
    {
      file,
      setFile,
      removeFile,
      maxSizeInMB,
      allowedTypes,
      successMessage,
      errorMessage,
      children: ({ isUploading, triggerFileSelect, handleFileDelete, hasFile }) => /* @__PURE__ */ jsxs8("div", { className: cn("relative", className), children: [
        !hasFile && /* @__PURE__ */ jsxs8(
          Button,
          {
            disabled: isUploading,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx8(LoaderCircle4, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx8(ImagePlus4, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add image"
            ]
          }
        ),
        file && /* @__PURE__ */ jsxs8("div", { className: "relative p-4 w-fit", children: [
          /* @__PURE__ */ jsx8(
            ImageView,
            {
              src: file,
              alt: "Uploaded image",
              className: cn("rounded-lg overflow-hidden", imageClassName)
            }
          ),
          /* @__PURE__ */ jsx8("div", { className: "absolute top-0 right-0", children: /* @__PURE__ */ jsx8(
            ConfirmAlertDialog_default,
            {
              trigger: (props) => /* @__PURE__ */ jsx8(
                Button,
                {
                  ...props,
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                  children: /* @__PURE__ */ jsx8(Trash4, { className: "h-4 w-4" })
                }
              ),
              title: "Delete image",
              description: "Are you sure you want to delete this image? This action cannot be undone.",
              confirmLabel: "Delete",
              cancelLabel: "Cancel",
              onConfirm: handleFileDelete
            }
          ) })
        ] })
      ] })
    }
  );
}

// src/image/view/ImageViewProvider.tsx
import "react";
import { jsx as jsx9 } from "react/jsx-runtime";
function ImageViewProvider({
  transformImageUrlFn,
  children
}) {
  const fn = transformImageUrlFn ?? ((id) => id);
  return /* @__PURE__ */ jsx9(ImageViewProviderContext_default.Provider, { value: { transformImageUrlFn: fn }, children });
}
export {
  ImageView,
  ImageViewProvider,
  MultiImageCropUploader,
  MultiImageUploader,
  SingleImageCropUploader,
  SingleImageUploader
};
//# sourceMappingURL=index.mjs.map