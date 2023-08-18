import { stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })

export default function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate('#arrow', { rotate: isOpen ? 180 : 0 })
  }, [animate, isOpen])

  return scope
}
