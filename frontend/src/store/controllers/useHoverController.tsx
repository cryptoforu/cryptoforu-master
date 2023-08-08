import { useHovered } from '@/store/useHoveredStore'
import { Nullable } from '@/types/shared-types'

export default function useHoverController() {
  const hoveredIndex = useHovered.use.hoveredIndex()
  const setHovered = useHovered.use.setHovered()
  const isHovered = useHovered.use.isHovered()

  function onHoverStart(index: Nullable<number | string>) {
    setHovered(index)
  }

  function onHoverEnd() {
    setHovered(null)
  }

  return {
    isHovered,
    hoveredIndex,
    onHoverStart,
    onHoverEnd,
  }
}
