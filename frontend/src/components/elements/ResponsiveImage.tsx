'use client'
import Image, { ImageProps } from 'next/image'
import useDimensions from 'react-cool-dimensions'
import { imageKitLoader } from '@/lib/imageKitLoader'

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  ...rest
}: ImageProps) {
  const {
    observe,
    width: resW,
    height: resH,
  } = useDimensions({
    useBorderBoxSize: true,
    updateOnBreakpointChange: true,
  })
  let sizes = {
    w: resW === null ? 1200 : resW,
    h: resH === null ? 600 : resH,
  }

  let imgWidth = width !== undefined ? width : sizes.w
  let imgHeight = height !== undefined ? height : sizes.h

  return (
    <Image
      loader={imageKitLoader}
      ref={observe}
      src={src}
      width={imgWidth}
      height={imgHeight}
      alt={alt}
      {...rest}
    />
  )
}
