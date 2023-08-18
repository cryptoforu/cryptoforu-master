import { useCallback, useEffect } from 'react'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import type { TableOfContents } from '@/store/types/post-store'
import { usePostStore } from '@/store/usePostStore'

export function useToc(toc: TableOfContents[]) {
  const dispatch = usePostStore((state) => state.dispatch)
  const handleToc = useCallback(
    (toc: TableOfContents[]) => {
      dispatch({
        type: 'REGISTER_HEADING',
        payload: {
          content: toc,
        },
      })
    },
    [dispatch]
  )
  useEffectOnce(() => {
    handleToc(toc)
  })
}

export function usePostController() {
  const dispatch = usePostStore((state) => state.dispatch)
  const [toc, currentHeading] = usePostStore((state) => [
    state.toc,
    state.currentHeading,
    state.entry,
  ])
  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      dispatch({
        type: 'UPDATE_ENTRY',
        payload: {
          entry,
        },
      })
      if (entry.isIntersecting) {
        dispatch({
          type: 'SET_HEADING',
          payload: {
            currentHeading: entry.target.id,
          },
        })
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const observerParams = { threshold: 0, root: null, rootMargin: '0%' }
    const observer = new IntersectionObserver(updateEntry, observerParams)
    if (toc && toc.length > 0) {
      for (const val of toc) {
        const element = document.getElementById(val.id)
        const children = val.children
        if (element) {
          observer.observe(element)
        }
        if (children) {
          for (const child of children) {
            const childElement = document.getElementById(child.id)
            if (childElement) {
              observer.observe(childElement)
            }
          }
        }
      }
    }
    return () => observer.disconnect()
  }, [toc, updateEntry])

  function isActive(section: TableOfContents) {
    if (section.id === currentHeading) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return {
    toc,
    isActive,
    currentHeading,
  }
}
