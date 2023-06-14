'use client'

import { useEffect } from 'react'
import { AnimatePresence, useAnimate, usePresence } from 'framer-motion'
import { useIconPaths, useTheme } from '@/store/useThemeStore'
import { SolidButton } from '@/components/elements/Button'

function AnimatedIcon({ path }: { path?: string }) {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          'path',
          { pathLength: 1 },
          { duration: 0.3, ease: 'easeIn' }
        )
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate(
          'path',
          { pathLength: 0 },
          { duration: 0.3, ease: 'easeOut' }
        )
        safeToRemove()
      }

      exitAnimation()
    }
  }, [animate, isPresent, safeToRemove, scope])
  return (
    <svg
      ref={scope}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentcolor"
      width="24px"
      height="24px"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={path}
        pathLength={0}
      />
    </svg>
  )
}

const ThemeToggle = () => {
  const path = useIconPaths()
  const setTheme = useTheme()
  return (
    <AnimatePresence mode="wait">
      <SolidButton
        solid={'secondary'}
        key={path()}
        aria-label="Theme Switcher"
        onClick={() => setTheme()}
      >
        <AnimatedIcon path={path()} />
      </SolidButton>
    </AnimatePresence>
  )
}
export default ThemeToggle
