import Image, { ImageProps } from 'next/image'
import { forwardRef } from 'react'

import { ResponsiveImage } from '@/components/elements'

export interface LazyImageProps extends ImageProps {
  filter?: 'lg' | 'aspect-height' | 'upsize' | 'icon' | 'original'
  imageKit?: boolean
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  function LazyImage(props, ref) {
    const { src, alt, filter = 'aspect-height', imageKit, ...rest } = props
    if (imageKit) {
      return (
        <ResponsiveImage
          src={src as string}
          alt={alt}
          placeholder={'blur'}
          blurDataURL={`${src}?tr=bl-6`}
          {...rest}
        />
      )
    }
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URL}${filter}/${src}`}
        placeholder={'blur'}
        blurDataURL={`${process.env.NEXT_PUBLIC_IMG_URL}data-image/${src}`}
        alt={alt}
        ref={ref}
        {...rest}
      />
    )
  }
)
export default LazyImage
