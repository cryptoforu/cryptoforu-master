'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'

import { Button } from '@/components/elements'
import { Heading, ProseMarkdown } from '@/components/typography'
import { useAccordion } from '@/store/useAccordionStore'

function AccordionButton({
  index,
  question,
  children,
}: {
  index: number
  question: string
  children: ReactNode
}) {
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

  return (
    <div className={'my-6 rounded-lg bg-gray-100 p-8 dark:bg-gray-800'}>
      <Button
        colorScheme={'secondary'}
        onPress={() => setActive(index === activeIndex ? null : index)}
        className={'flex w-full items-center justify-between'}
      >
        <Heading>{question}</Heading>
        <motion.span
          className="rounded-full"
          style={{
            backgroundColor: isActive ? '#34d399' : '#64748b',
            color: isActive ? '#f1f5f9' : '#4b5563',
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={path}
              pathLength={0}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </svg>
        </motion.span>
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
            <ProseMarkdown className={'mx-auto max-w-none'}>
              {val.content}
            </ProseMarkdown>
          </motion.section>
        </AccordionButton>
      ))}
    </div>
  )
}
