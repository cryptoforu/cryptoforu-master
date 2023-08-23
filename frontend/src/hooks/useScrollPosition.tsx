import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

const useScrollPosition = () => {
  const [position, setPosition] = useState(0)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setPosition(latest)
  })

  return position
}
export default useScrollPosition
