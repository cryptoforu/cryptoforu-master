'use client'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { useHover } from 'react-aria'

import useNavStore from '@/store/useNavStore'
import { Nullable } from '@/types/shared-types'

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

export const useNavHover = () => {
  const hoveredRef = useRef(useNavStore.use.hoveredIndex())
  const setHovered = useNavStore.use.setHovered()
  useEffect(
    () =>
      useNavStore.subscribe(
        (state) => (hoveredRef.current = state.hoveredIndex)
      ),
    []
  )

  const isHovered = useCallback((id: Nullable<string | number>) => {
    return hoveredRef.current === id
  }, [])

  const { hoverProps } = useHover({
    onHoverStart: (e) => setHovered(e.target.id),
    onHoverEnd: () => setHovered(null),
  })

  return {
    isHovered,
    hoverProps,
    hoveredIndex: hoveredRef.current,
    setHovered,
  }
}
