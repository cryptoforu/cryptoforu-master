'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useCallback } from 'react'
import { useIsSSR } from '@react-aria/ssr'

gsap.registerPlugin(ScrollToPlugin)

export default function useScrollTo() {
  let isSSR = useIsSSR()

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
