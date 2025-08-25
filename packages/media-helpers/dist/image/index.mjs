import "../chunk-PMJAV4JJ.mjs";

// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/dialog.tsx
import "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx2(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx2(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx2(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx2(XIcon, {}),
                /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}

// src/image/uploader/ImageCropDialog.tsx
import { RotateCw, Upload, X } from "lucide-react";
import React3, { useCallback, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function ImageCropDialog({
  open,
  onOpenChange,
  files,
  onUpload
}) {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [crops, setCrops] = useState([]);
  const [rotations, setRotations] = useState([]);
  const imgRefs = useRef([]);
  React3.useEffect(() => {
    if (files.length > 0) {
      const newImages = files.map((file, index) => ({
        id: `img-${index}`,
        file,
        url: URL.createObjectURL(file),
        rotation: 0
      }));
      setImages(newImages);
      setCrops(new Array(files.length).fill(void 0));
      setRotations(new Array(files.length).fill(0));
      setSelectedImageIndex(0);
      imgRefs.current = new Array(files.length).fill(null);
    }
  }, [files]);
  React3.useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [images]);
  const handleCropChange = useCallback((crop, percentCrop, index) => {
    setCrops((prev) => {
      const newCrops = [...prev];
      newCrops[index] = percentCrop;
      return newCrops;
    });
  }, []);
  const handleRotate = useCallback((index) => {
    setRotations((prev) => {
      const newRotations = [...prev];
      newRotations[index] = (newRotations[index] + 90) % 360;
      return newRotations;
    });
  }, []);
  const handleRemoveImage = useCallback((index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setCrops((prev) => prev.filter((_, i) => i !== index));
    setRotations((prev) => prev.filter((_, i) => i !== index));
    if (selectedImageIndex >= index && selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
    } else if (selectedImageIndex === index && index === images.length - 1) {
      setSelectedImageIndex((prev) => Math.max(0, prev - 1));
    }
  }, [selectedImageIndex, images.length]);
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
  const selectedRotation = rotations[selectedImageIndex];
  if (images.length === 0) return null;
  return /* @__PURE__ */ jsx3(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs2(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsx3(DialogHeader, { children: /* @__PURE__ */ jsx3(DialogTitle, { children: "Edit Images" }) }),
    /* @__PURE__ */ jsxs2("div", { className: "flex-1 flex flex-col gap-4 overflow-hidden select-none", children: [
      /* @__PURE__ */ jsx3("div", { className: "shrink-0 flex flex-row gap-2 h-24 overflow-x-auto pb-2", children: images.map((image, index) => /* @__PURE__ */ jsxs2(
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
                src: image.url,
                alt: `Image ${index + 1}`,
                className: "aspect-square h-full object-cover",
                style: {
                  transform: `rotate(${rotations[index]}deg)`
                }
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
                children: /* @__PURE__ */ jsx3(X, { className: "h-3 w-3" })
              }
            )
          ]
        },
        image.id
      )) }),
      /* @__PURE__ */ jsxs2("div", { className: "flex-1 flex flex-col gap-4 overflow-hidden", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs2("h3", { className: "text-sm font-medium", children: [
            "Image ",
            selectedImageIndex + 1,
            " of ",
            images.length
          ] }),
          /* @__PURE__ */ jsxs2(
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
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "flex-1 flex items-center justify-center overflow-hidden bg-muted/20 rounded-lg", children: selectedImage && /* @__PURE__ */ jsx3(
          ReactCrop,
          {
            crop: selectedCrop,
            onChange: (crop, percentCrop) => handleCropChange(crop, percentCrop, selectedImageIndex),
            aspect: void 0,
            minWidth: 50,
            minHeight: 50,
            keepSelection: true,
            children: /* @__PURE__ */ jsx3(
              "img",
              {
                ref: (el) => {
                  imgRefs.current[selectedImageIndex] = el;
                },
                src: selectedImage.url,
                alt: `Selected image ${selectedImageIndex + 1}`,
                className: "max-h-[400px] max-w-full object-contain",
                style: {
                  transform: `rotate(${selectedRotation}deg)`
                }
              }
            )
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(DialogFooter, { children: [
      /* @__PURE__ */ jsx3(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => onOpenChange(false),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxs2(
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

// src/image/uploader/imageProcessingUtils.ts
import "react-image-crop";
function processImage(file, crop, rotation = 0) {
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
            (blob) => {
              if (blob) {
                const processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
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
            (blob) => {
              if (blob) {
                const processedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
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
async function processImages(processedImages) {
  const processedFiles = await Promise.all(
    processedImages.map(
      ({ file, crop, rotation }) => processImage(file, crop, rotation)
    )
  );
  return processedFiles;
}

// src/image/view/ImageViewProviderContext.tsx
import { createContext, useContext } from "react";
var defaultTransform = (storageId) => storageId;
var ImageViewContext = createContext({
  transformImageUrlFn: defaultTransform
});
var useImageView = () => useContext(ImageViewContext);
var ImageViewProviderContext_default = ImageViewContext;

// src/image/view/ImageView.tsx
import { Ellipsis, X as X2 } from "lucide-react";
import { useState as useState2 } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ImageView({
  src,
  alt,
  canExpand = true,
  className,
  externalImageUrlFn
}) {
  const [status, setStatus] = useState2(
    "loading"
  );
  const [imgClassNames, setImgClassNames] = useState2({
    width: "100%",
    height: "100%",
    objectFit: "cover"
  });
  const [isOpen, setIsOpen] = useState2(false);
  const { transformImageUrlFn } = useImageView();
  const imageSrc = externalImageUrlFn ? externalImageUrlFn(src) : transformImageUrlFn(src);
  return /* @__PURE__ */ jsxs3("div", { className: cn("w-full h-full relative select-none", className), children: [
    /* @__PURE__ */ jsx4(
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
    status === "loading" && /* @__PURE__ */ jsx4("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx4(Ellipsis, { className: "h-4 w-4 animate-pulse" }) }),
    status === "error" && /* @__PURE__ */ jsx4("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx4(X2, { className: "h-4 w-4" }) }),
    isOpen && status === "loaded" && /* @__PURE__ */ jsx4(
      "div",
      {
        className: "fixed inset-0  backdrop-blur-2xl z-50 flex items-center justify-center",
        onClick: () => setIsOpen(false),
        children: /* @__PURE__ */ jsx4(
          TransformWrapper,
          {
            wheel: { step: 0.5 },
            pinch: { disabled: false },
            doubleClick: { disabled: true },
            children: /* @__PURE__ */ jsx4(
              TransformComponent,
              {
                wrapperStyle: { width: "100%", height: "100%" },
                children: /* @__PURE__ */ jsxs3(
                  "div",
                  {
                    className: "relative max-w-full max-h-full p-4",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsx4(
                        Button,
                        {
                          type: "button",
                          variant: "secondary",
                          size: "icon",
                          className: "cursor-pointer absolute top-2 right-2 hover:bg-primary hover:text-primary-foreground",
                          onClick: () => setIsOpen(false),
                          children: /* @__PURE__ */ jsx4(X2, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsx4(
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

// src/image/uploader/MultiImageCropUploader.tsx
import { useFileUpload } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus, LoaderCircle, Trash } from "lucide-react";
import { useRef as useRef2, useState as useState3 } from "react";

// src/components/ui/alert-dialog.tsx
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx5(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx5(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx5(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx5(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx5(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    AlertDialogPrimitive.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}

// src/image/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs5(AlertDialog, { children: [
    trigger ? /* @__PURE__ */ jsx6(AlertDialogTrigger, { children: trigger }) : null,
    /* @__PURE__ */ jsxs5(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs5(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx6(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx6(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs5(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx6(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx6(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/image/uploader/MultiImageCropUploader.tsx
import { Fragment, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
  previewImageItemClassName
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
      const processedFiles = await processImages(processedImages);
      for (const file of processedFiles) {
        const storageId = await uploadFile(file);
        appendImage({ value: storageId });
      }
    } catch (error) {
      console.error("Error processing images:", error);
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
  return /* @__PURE__ */ jsxs6(Fragment, { children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsxs6(
        Button,
        {
          disabled: isUploading || !canAddMore,
          variant: "default",
          size: "default",
          className: "w-fit",
          onClick: triggerFileSelect,
          children: [
            isUploading ? /* @__PURE__ */ jsx7(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx7(ImagePlus, { className: "h-4 w-4" }),
            isUploading ? "Uploading..." : "Add image(s)"
          ]
        }
      ),
      /* @__PURE__ */ jsxs6("p", { className: "text-sm text-muted-foreground", children: [
        "Maximum ",
        maxFiles,
        " images allowed"
      ] }),
      imageFields.length > 0 && /* @__PURE__ */ jsx7(
        "div",
        {
          className: cn(
            "flex flex-row flex-nowrap h-64 overflow-x-scroll show-scrollbar",
            previewImageListClassName
          ),
          children: imageFields.map((field, index) => /* @__PURE__ */ jsxs6(
            "div",
            {
              className: "shrink-0 h-full relative aspect-square p-4",
              children: [
                /* @__PURE__ */ jsx7(
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
                /* @__PURE__ */ jsx7("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx7(
                  ConfirmAlertDialog_default,
                  {
                    trigger: /* @__PURE__ */ jsx7(
                      Button,
                      {
                        type: "button",
                        variant: "secondary",
                        size: "icon",
                        className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                        children: /* @__PURE__ */ jsx7(Trash, { className: "h-4 w-4" })
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
    /* @__PURE__ */ jsx7(
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

// src/image/uploader/MultiImageUploader.tsx
import { MultipleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus as ImagePlus2, LoaderCircle as LoaderCircle2, Trash as Trash2 } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx8(
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
      children: ({ isUploading, triggerFileSelect, handleFileDelete, canAddMore }) => /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs7(
          Button,
          {
            disabled: isUploading || !canAddMore,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx8(LoaderCircle2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx8(ImagePlus2, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add image(s)"
            ]
          }
        ),
        /* @__PURE__ */ jsxs7("p", { className: "text-sm text-muted-foreground", children: [
          "Maximum ",
          maxFiles,
          " images allowed"
        ] }),
        imageFields.length > 0 && /* @__PURE__ */ jsx8(
          "div",
          {
            className: cn(
              "flex flex-row flex-nowrap h-64 overflow-x-scroll show-scrollbar",
              previewImageListClassName
            ),
            children: imageFields.map((field, index) => /* @__PURE__ */ jsxs7(
              "div",
              {
                className: "shrink-0 h-full relative aspect-square p-4",
                children: [
                  /* @__PURE__ */ jsx8(
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
                  /* @__PURE__ */ jsx8("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx8(
                    ConfirmAlertDialog_default,
                    {
                      trigger: /* @__PURE__ */ jsx8(
                        Button,
                        {
                          type: "button",
                          variant: "secondary",
                          size: "icon",
                          className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                          children: /* @__PURE__ */ jsx8(Trash2, { className: "h-4 w-4" })
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

// src/image/uploader/SingleImageUploader.tsx
import { SingleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus as ImagePlus3, LoaderCircle as LoaderCircle3, Trash as Trash3 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx9(
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
              isUploading ? /* @__PURE__ */ jsx9(LoaderCircle3, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx9(ImagePlus3, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add image"
            ]
          }
        ),
        file && /* @__PURE__ */ jsxs8("div", { className: "relative", children: [
          /* @__PURE__ */ jsx9(
            ImageView,
            {
              src: file,
              alt: "Uploaded image",
              className: cn("rounded-lg overflow-hidden", imageClassName)
            }
          ),
          /* @__PURE__ */ jsx9("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx9(
            ConfirmAlertDialog_default,
            {
              trigger: /* @__PURE__ */ jsx9(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                  children: /* @__PURE__ */ jsx9(Trash3, { className: "h-4 w-4" })
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
import { jsx as jsx10 } from "react/jsx-runtime";
function ImageViewProvider({
  transformImageUrlFn,
  children
}) {
  const fn = transformImageUrlFn ?? ((id) => id);
  return /* @__PURE__ */ jsx10(ImageViewProviderContext_default.Provider, { value: { transformImageUrlFn: fn }, children });
}
export {
  ImageCropDialog,
  ImageView,
  ImageViewProvider,
  MultiImageCropUploader,
  MultiImageUploader,
  SingleImageUploader,
  processImage,
  processImages,
  useImageView
};
//# sourceMappingURL=index.mjs.map