'use client'
import { AnimatePresence, motion, useAnimate, usePresence } from 'framer-motion'
import { useAccordion } from '@/store/useAccordionStore'
import { Button } from '@/components/elements'
import { ReactNode, useEffect, useRef } from 'react'
import { Heading, ProseMarkdown, Text } from '@/components/typography'

function AccordionButton({
  index,
  question,
  children,
}: {
  index: number
  question: string
  children: ReactNode
}) {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  const setActive = useAccordion.use.setActiveIndex()
  const activeIndex = useAccordion.use.activeIndex()
  const getIconPaths = useAccordion.use.getIconPath()

  const isActiveRef = useRef(useAccordion.getState().getActive)
  useEffect(
    () =>
      useAccordion.subscribe(
        (state) => (isActiveRef.current = state.getActive)
      ),
    []
  )
  const isActive = isActiveRef.current(index)
  const path = getIconPaths(isActive)
  useEffect(() => {
    if (isPresent) {
      const pathSequence = [
        [
          'span',
          {
            backgroundColor: isActive ? '#34d399' : '#64748b',
            color: isActive ? '#f1f5f9' : '#4b5563',
          },
          { duration: 0.3 },
        ],
        ['path', { pathLength: 1 }, { duration: 0.3, ease: 'easeIn' }],
      ]
      const enterAnimation = async () => {
        await animate(scope.current && pathSequence)
      }
      void enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate(
          'path',
          { pathLength: 0 },
          { duration: 0.3, ease: 'easeOut' }
        )
        safeToRemove()
      }

      void exitAnimation()
    }
  }, [animate, isActive, isPresent, safeToRemove, scope])
  return (
    <div
      ref={scope}
      className={'my-6 rounded-lg bg-gray-100 p-8 dark:bg-gray-800'}
    >
      <Button
        colorScheme={'secondary'}
        onClick={() => setActive(index === activeIndex ? null : index)}
        className={'flex w-full items-center justify-between'}
      >
        <Heading>{question}</Heading>
        <span className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={path}
              pathLength={0}
            />
          </svg>
        </span>
      </Button>
      <AnimatePresence initial={false}>{isActive && children}</AnimatePresence>
    </div>
  )
}

type Item = {
  label: string
  content: ReactNode
}

export interface IAccordionProps {
  items: Item[]
}

const MotionText = motion(Text)
const MotionProse = motion(ProseMarkdown)
export default function Accordion({ items }: IAccordionProps) {
  return (
    <div className={'pt-6'}>
      {items.map((val, index) => (
        <AccordionButton key={index} index={index} question={val.label}>
          <motion.section
            className="overflow-hidden p-6"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <MotionProse
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className={'mx-auto max-w-none'}
            >
              {val.content}
            </MotionProse>
          </motion.section>
        </AccordionButton>
      ))}
    </div>
  )
}
