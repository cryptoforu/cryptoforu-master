import { RefObject, useEffect, useState } from 'react'

export default function useObserver({
  containerRef,
  childRefs,
}: {
  containerRef: RefObject<Element>
  childRefs: RefObject<Element[] | null[]>
}) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && childRefs.current !== null) {
            const element = Array.from(childRefs.current)
            setActiveIndex(element.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    )
    if (childRefs.current) {
      for (const child of childRefs.current) {
        if (child) {
          observer.observe(child)
        }
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [containerRef, childRefs])
  return [activeIndex]
}
