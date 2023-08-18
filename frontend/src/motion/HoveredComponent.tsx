'use client'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimate,
  usePresence,
} from 'framer-motion'
import { Route } from 'next'
import NextLink from 'next/link'
import { useEffect } from 'react'

import useHoverController from '@/store/controllers/useHoverController'

function useHoverAnimation() {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        scope.current &&
          (await animate(scope.current, { opacity: 1 }, { duration: 0.15 }))
      }
      void enterAnimation()
    } else {
      const exitAnimation = async () => {
        scope.current &&
          (await animate(
            scope.current,
            { opacity: 0 },
            { duration: 0.15, delay: 0.2 }
          ))
        safeToRemove()
      }

      void exitAnimation()
    }
  }, [animate, isPresent, safeToRemove, scope])
  return scope
}

export type HoveredProps = {
  className?: string
  id: string
  layoutId: string
  link?: string
}

const MotionLink = motion(NextLink)

export default function HoveredComponent({
  id,
  layoutId,
  className,
  link,
}: HoveredProps) {
  const { isHovered } = useHoverController()

  const scope = useHoverAnimation()
  return (
    <AnimatePresence>
      {isHovered(id) && (
        <LayoutGroup id={layoutId}>
          <MotionLink
            layoutId={layoutId}
            href={link as Route}
            ref={scope}
            className={className}
          />
        </LayoutGroup>
      )}
    </AnimatePresence>
  )
}
