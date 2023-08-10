'use client'
import useNavStore from '@/store/useNavStore'
import { useEffect, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Nullable } from '@/types/shared-types'
import { usePathname } from 'next/navigation'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { useHover } from 'react-aria'

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

  function isHovered(index: Nullable<string | number>) {
    return hoveredRef.current === index
  }

  const { hoverProps } = useHover({
    onHoverStart: (e) => setHovered(e.target.id),
    onHoverEnd: () => setHovered(null),
  })

  return {
    isHovered,
    hoverProps,
  }
}

export const useActiveLink = () => {
  const path = usePathname()
  const activeRef = useRef(useNavStore.use.activeLink())
  const setActive = useNavStore.use.setActive()
  useEffect(
    () =>
      useNavStore.subscribe((state) => (activeRef.current = state.activeLink)),
    []
  )

  useUpdateEffect(() => {
    setActive(path)
  }, [path])

  function isActive(href: string) {
    return activeRef.current === href
  }

  return isActive
}
