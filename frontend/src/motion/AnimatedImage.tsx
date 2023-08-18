'use client'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

import type { LazyImageProps } from '@/components/elements/LazyImage'
import LazyImage from '@/components/elements/LazyImage'

const MotionImage = motion(LazyImage)

export interface AnimatedImage extends LazyImageProps {
  imgClass?: string
}

export default function AnimatedImage(props: AnimatedImage) {
  const [imageLoading, setImageLoading] = useState(true)
  const [pulsing, setPulsing] = useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 600)
  }

  const { src, alt, width, height, className, ...rest } = props
  return (
    <motion.div
      className={clsx(
        'relative my-0 overflow-hidden transition-all duration-500',
        pulsing && 'animate-pulse bg-primary-white dark:bg-slate-700',
        className
      )}
    >
      <MotionImage
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{
          opacity: { delay: 0.5, duration: 1, ease: 'easeIn' },
        }}
        onLoadingComplete={imageLoaded}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx('object-cover', props.imgClass)}
      />
    </motion.div>
  )
}
