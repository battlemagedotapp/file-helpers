import '../chunk-PMJAV4JJ.mjs'

// src/image/view/ImageView.tsx
import { Ellipsis, X } from 'lucide-react'
import { useState } from 'react'

// src/image/view/ImageViewProviderContext.tsx
import { createContext, useContext } from 'react'
var defaultTransform = (storageId) => storageId
var ImageViewContext = createContext({
  transformImageUrlFn: defaultTransform,
})
var useImageView = () => useContext(ImageViewContext)
var ImageViewProviderContext_default = ImageViewContext

// src/image/view/ImageView.tsx
import { jsx, jsxs } from 'react/jsx-runtime'
function ImageView({ src, alt }) {
  const [status, setStatus] = useState('loading')
  const [imgClassNames, setImgClassNames] = useState(
    'w-full h-full object-cover',
  )
  const { transformImageUrlFn } = useImageView()
  const imageSrc = transformImageUrlFn ? transformImageUrlFn(src) : src
  return /* @__PURE__ */ jsxs('div', {
    className: 'w-full h-full relative',
    children: [
      /* @__PURE__ */ jsx('img', {
        src: imageSrc,
        alt,
        className: imgClassNames,
        onLoad: () => {
          setStatus('loaded')
          setImgClassNames('w-full h-full object-cover')
        },
        onError: () => {
          setStatus('error')
          setImgClassNames('w-0 h-0')
        },
      }),
      status === 'loading' &&
        /* @__PURE__ */ jsx('div', {
          className: 'absolute inset-0 flex items-center justify-center',
          children: /* @__PURE__ */ jsx(Ellipsis, {
            className: 'h-4 w-4 animate-pulse',
          }),
        }),
      status === 'error' &&
        /* @__PURE__ */ jsx('div', {
          className: 'absolute inset-0 flex items-center justify-center',
          children: /* @__PURE__ */ jsx(X, { className: 'h-4 w-4' }),
        }),
    ],
  })
}

// src/image/view/ImageViewProvider.tsx
import 'react'
import { jsx as jsx2 } from 'react/jsx-runtime'
function ImageViewProvider({ transformImageUrlFn, children }) {
  const fn = transformImageUrlFn ?? ((id) => id)
  return /* @__PURE__ */ jsx2(ImageViewProviderContext_default.Provider, {
    value: { transformImageUrlFn: fn },
    children,
  })
}
export { ImageView, ImageViewProvider, useImageView }
//# sourceMappingURL=index.mjs.map
