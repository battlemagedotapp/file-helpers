import { Ellipsis, X } from 'lucide-react'
import { useState } from 'react'
import { useImageView } from './ImageViewProviderContext'

type ImageViewProps = {
  src: string
  alt: string
}

export function ImageView({ src, alt }: ImageViewProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )
  const [imgClassNames, setImgClassNames] = useState<object>({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  })
  const { transformImageUrlFn } = useImageView()
  const imageSrc = transformImageUrlFn ? transformImageUrlFn(src) : src
  return (
    <div className="w-full h-full relative">
      <img
        src={imageSrc}
        alt={alt}
        style={imgClassNames}
        onLoad={() => {
          setStatus('loaded')
          setImgClassNames({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          })
        }}
        onError={() => {
          setStatus('error')
          setImgClassNames({
            width: '0',
            height: '0',
            objectFit: 'cover',
          })
        }}
      />
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Ellipsis className="h-4 w-4 animate-pulse" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <X className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
