'use client'
import { useHover } from 'react-aria'

import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { useImageSliderContext } from '@/store/useImageSliderStore'

export default function useImageSliderController() {
  const [page, direction] = useImageSliderContext((state) => [
    state.page,
    state.direction,
  ])
  const [autoplay, setAutoPlay] = useImageSliderContext((state) => [
    state.autoplay,
    state.setAutoPlay,
  ])

  const paginate = useImageSliderContext((state) => state.paginate)
  const swipePower = useImageSliderContext((state) => state.swipePower)
  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => setAutoPlay(false),
    onHoverEnd: () => setAutoPlay(true),
  })
  useUpdateEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        paginate(1)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoplay])
  return {
    page,
    direction,
    swipePower,
    paginate,
    hoverProps,
    isHovered,
  }
}
