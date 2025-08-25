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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ImageView({ src, alt, canExpand = true }) {
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
  const imageSrc = transformImageUrlFn ? transformImageUrlFn(src) : src;
  console.log(imageSrc);
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative", children: [
    /* @__PURE__ */ jsx2(
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
    status === "loading" && /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx2(Ellipsis, { className: "h-4 w-4 animate-pulse" }) }),
    status === "error" && /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx2(X, { className: "h-4 w-4" }) }),
    isOpen && status === "loaded" && /* @__PURE__ */ jsx2(
      "div",
      {
        className: "fixed inset-0  border backdrop-blur-2xl z-50 flex items-center justify-center",
        onClick: () => setIsOpen(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative max-w-full max-h-full p-4",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx2(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  className: "cursor-pointer absolute top-2 right-2 hover:bg-primary hover:text-primary-foreground",
                  onClick: () => setIsOpen(false),
                  children: /* @__PURE__ */ jsx2(X, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx2(
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
  ] });
}

// src/image/uploader/MultiImageUploader.tsx
import { MultipleFileUploaderHeadless } from "@battlemagedotapp/convex-upload-helpers";
import { ImagePlus, LoaderCircle, Trash } from "lucide-react";

// src/components/ui/alert-dialog.tsx
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsxs2(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx3(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}

// src/image/uploader/ConfirmAlertDialog.tsx
import "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ConfirmAlertDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs3(AlertDialog, { children: [
    trigger ? /* @__PURE__ */ jsx4(AlertDialogTrigger, { children: trigger }) : null,
    /* @__PURE__ */ jsxs3(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs3(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx4(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx4(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs3(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx4(AlertDialogCancel, { children: cancelLabel }),
        /* @__PURE__ */ jsx4(AlertDialogAction, { onClick: onConfirm, children: confirmLabel })
      ] })
    ] })
  ] });
}
var ConfirmAlertDialog_default = ConfirmAlertDialog;

// src/image/uploader/MultiImageUploader.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function MultiImageUploader({
  imageFields,
  appendImage,
  removeImage,
  maxFiles,
  maxSizeInMB,
  allowedTypes,
  successMessage,
  errorMessage
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
      children: ({ isUploading, triggerFileSelect, handleFileDelete, canAddMore }) => /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs4(
          Button,
          {
            disabled: isUploading || !canAddMore,
            variant: "default",
            size: "default",
            className: "w-fit",
            onClick: triggerFileSelect,
            children: [
              isUploading ? /* @__PURE__ */ jsx5(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx5(ImagePlus, { className: "h-4 w-4" }),
              isUploading ? "Uploading..." : "Add image(s)"
            ]
          }
        ),
        /* @__PURE__ */ jsxs4("p", { className: "text-sm text-muted-foreground", children: [
          "Maximum ",
          maxFiles,
          " images allowed"
        ] }),
        imageFields.length > 0 && /* @__PURE__ */ jsx5("div", { className: "flex flex-row flex-nowrap w-full h-48 overflow-x-scroll show-scrollbar", children: imageFields.map((field, index) => /* @__PURE__ */ jsxs4(
          "div",
          {
            className: "shrink-0 w-56 h-full relative p-4",
            children: [
              /* @__PURE__ */ jsx5("div", { className: "rounded-lg overflow-hidden w-full h-full", children: /* @__PURE__ */ jsx5(ImageView, { src: field.value, alt: `Image ${index + 1}` }) }),
              /* @__PURE__ */ jsx5("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx5(
                ConfirmAlertDialog_default,
                {
                  trigger: /* @__PURE__ */ jsx5(
                    Button,
                    {
                      type: "button",
                      variant: "secondary",
                      size: "icon",
                      className: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                      children: /* @__PURE__ */ jsx5(Trash, { className: "h-4 w-4" })
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
        )) })
      ] })
    }
  );
}

// src/image/view/ImageViewProvider.tsx
import "react";
import { jsx as jsx6 } from "react/jsx-runtime";
function ImageViewProvider({
  transformImageUrlFn,
  children
}) {
  const fn = transformImageUrlFn ?? ((id) => id);
  return /* @__PURE__ */ jsx6(ImageViewProviderContext_default.Provider, { value: { transformImageUrlFn: fn }, children });
}
export {
  ImageView,
  ImageViewProvider,
  MultiImageUploader,
  useImageView
};
//# sourceMappingURL=index.mjs.map