'use client'
import { useIsSSR } from '@react-aria/ssr'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useCallback } from 'react'

gsap.registerPlugin(ScrollToPlugin)

export default function useScrollTo() {
  const isSSR = useIsSSR()

  return useCallback(
    ({ y, offsetY }: ScrollToPlugin.Vars) => {
      !isSSR &&
        gsap.to(window, {
          duration: 2,
          scrollTo: { y: y, offsetY: offsetY, autoKill: true },
          ease: 'power2',
        })
    },
    [isSSR]
  )
}
