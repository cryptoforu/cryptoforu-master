'use client'
import useNavStore from '@/store/useNavStore'
import { useEffect, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export const useNavController = () => {
  const scrolledRef = useRef(useNavStore.use.navState())
  const setScrolled = useNavStore.use.setScrolled()
  useEffect(
    () =>
      useNavStore.subscribe((state) => (scrolledRef.current = state.navState)),
    []
  )
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10)
  })
  return scrolledRef.current
}
