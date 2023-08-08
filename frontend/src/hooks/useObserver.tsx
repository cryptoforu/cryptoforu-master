import { RefObject, useEffect, useState } from 'react'

export default function useObserver({
  containerRef,
  childRefs,
}: {
  containerRef: RefObject<Element>
  childRefs: RefObject<Element[] | null[]>
}) {
  let [activeIndex, setActiveIndex] = useState<number | undefined>(0)

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            childRefs.current &&
              // @ts-ignore
              setActiveIndex(childRefs.current.indexOf(entry.target))
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
      for (let child of childRefs?.current) {
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
