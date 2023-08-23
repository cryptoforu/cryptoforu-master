'use client'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { ReactNode, useRef } from 'react'

import { Text } from '@/components/typography'

interface ScrollProps {
  children: ReactNode
  header: string
}

export default function ScrollContainer({ children, header }: ScrollProps) {
  const containerRef = useRef(null)
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['end end', 'start start'],
  })
  const height = useMotionValue(0)
  const heightSpring = useSpring(height, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  useMotionValueEvent(scrollY, 'change', (latest) => {
    height.set(latest)
  })
  return (
    <div
      ref={containerRef}
      className={
        'mt-8 min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16'
      }
    >
      <header className={'max-w-2xl'}>
        <Text>{header}</Text>
      </header>
      <div className={'relative mt-16 flex w-full overflow-hidden md:p-6'}>
        <motion.div
          className={
            'absolute inset-y-0 left-0 max-h-fit w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-300 dark:bg-gradient-to-b dark:from-emerald-400 dark:to-teal-300'
          }
          style={{ height: heightSpring }}
        />

        <div className="flex flex-col space-y-16">{children}</div>
      </div>
    </div>
  )
}
