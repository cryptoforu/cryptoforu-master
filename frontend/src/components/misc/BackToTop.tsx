'use client'
import { useBackToTop } from '@/store/useBackToTopStore'
import { Button } from '@/components/elements'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import useScrollTo from '@/hooks/useScrollTo'

const BackToTop = () => {
  const showBtn = useBackToTop.use.showBtn()
  const setShowBtn = useBackToTop.use.setShowBtn()
  const scrollTo = useScrollTo()
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowBtn(latest > 100)
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {showBtn && (
        <Button
          whileHover={{ y: -10, scale: 1.01 }}
          colorScheme={'secondary'}
          onClick={() => scrollTo({ y: 0 })}
          className={'fixed bottom-8 right-8 z-50'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            className={'absolute inset-0'}
          >
            <motion.g
              id="Rectangle_1"
              data-name="Rectangle 1"
              fill="transparent"
              strokeWidth={4}
            >
              <motion.rect
                width="52"
                height="52"
                rx="8"
                stroke="#0a8a81"
                style={{ pathLength }}
              />
              <rect x="2" y="2" width="48" height="48" rx="6" fill="none" />
            </motion.g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="32"
            height="32"
          >
            <path
              fill="#1a9ba1"
              d="M25.168,2.484l15.849,15.849c0.645,0.645,0.645,1.69,0,2.335l-3.349,3.349c-0.645,0.645-1.69,0.645-2.335,0L19.484,8.168c-0.645-0.645-0.645-1.69,0-2.335l3.349-3.349C23.477,1.839,24.523,1.839,25.168,2.484z"
            />
            <path
              fill="#37c6d0"
              d="M28.516,8.168L12.667,24.016c-0.645,0.645-1.69,0.645-2.335,0l-3.349-3.349 c-0.645-0.645-0.645-1.69,0-2.335L22.833,2.484c0.645-0.645,1.69-0.645,2.335,0l3.349,3.349 C29.161,6.477,29.161,7.523,28.516,8.168z"
            />
            <motion.path
              fill="#37c6d0"
              d="M29,44V7l-10,3v34c0,1.105,0.895,2,2,2h6C28.105,46,29,45.105,29,44z"
            />
          </svg>
        </Button>
      )}
    </>
  )
}
export default BackToTop
