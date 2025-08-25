import { Button } from '@/components/ui/button'
import { useImageView } from '@/image/view/ImageViewProviderContext'
import { cn } from '@/lib/utils'
import { Ellipsis, X } from 'lucide-react'
import { useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

type ImageViewProps = {
  src: string
  alt: string
  canExpand?: boolean
  className?: string
  externalImageUrlFn?: (url: string) => string
}

export function ImageView({
  src,
  alt,
  canExpand = true,
  className,
  externalImageUrlFn,
}: ImageViewProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )
  const [imgClassNames, setImgClassNames] = useState<object>({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { transformImageUrlFn } = useImageView()
  const imageSrc = externalImageUrlFn
    ? externalImageUrlFn(src)
    : transformImageUrlFn(src)
  return (
    <div className={cn('w-full h-full relative select-none', className)}>
      <img
        src={imageSrc}
        alt={alt}
        style={imgClassNames}
        className={canExpand ? 'hover:cursor-pointer' : ''}
        onClick={() => {
          if (canExpand && status === 'loaded') setIsOpen(true)
        }}
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

      {isOpen && status === 'loaded' && (
        <div
          className="fixed inset-0  backdrop-blur-2xl z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <TransformWrapper
            wheel={{ step: 0.5 }}
            pinch={{ disabled: false }}
            doubleClick={{ disabled: true }}
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <div
                className="relative max-w-full max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="cursor-pointer absolute top-2 right-2 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <img
                  src={imageSrc}
                  alt={alt}
                  className="max-w-[90vw] max-h-[90vh] object-contain"
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </div>
  )
}
