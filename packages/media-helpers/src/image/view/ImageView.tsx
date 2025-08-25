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
  const [imgClassNames, setImgClassNames] = useState<string>(
    'w-full h-full object-cover',
  )
  const { transformImageUrlFn } = useImageView()
  const imageSrc = transformImageUrlFn ? transformImageUrlFn(src) : src
  return (
    <div className="w-full h-full relative">
      <img
        src={imageSrc}
        alt={alt}
        className={imgClassNames}
        onLoad={() => {
          setStatus('loaded')
          setImgClassNames('w-full h-full object-cover')
        }}
        onError={() => {
          setStatus('error')
          setImgClassNames('w-0 h-0')
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
