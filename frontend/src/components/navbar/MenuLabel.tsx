'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

type MenuLabelProps = {
  selected: boolean
  isActive: boolean
  title: string | ReactNode
}

const MenuLabel = ({ selected, title, isActive }: MenuLabelProps) => {
  return (
    <>
      <AnimatePresence mode={'wait'}>
        {selected && (
          <motion.div
            layoutId={'hoveredMenu'}
            className={
              'absolute inset-0 rounded-lg bg-gray-100 dark:bg-slate-950/50'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      {isActive && (
        <motion.div
          layoutId={'activeLink'}
          className={
            'absolute inset-x-2 bottom-0 h-px rounded-full bg-emerald-400'
          }
        />
      )}
      {title}
    </>
  )
}
export default MenuLabel
