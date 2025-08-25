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
                  className: "max-w-[100vw] max-h-[90vh] object-contain"
                }
              )
            ]
          }
        )
      }
    )
  ] });
}

// src/image/view/ImageViewProvider.tsx
import "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function ImageViewProvider({
  transformImageUrlFn,
  children
}) {
  const fn = transformImageUrlFn ?? ((id) => id);
  return /* @__PURE__ */ jsx3(ImageViewProviderContext_default.Provider, { value: { transformImageUrlFn: fn }, children });
}
export {
  ImageView,
  ImageViewProvider,
  useImageView
};
//# sourceMappingURL=index.mjs.map