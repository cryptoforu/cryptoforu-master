'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type MenuLabelProps = {
  selected: boolean
  isActive: boolean
  title: string | ReactNode
}

const MenuLabel = ({ selected, title, isActive }: MenuLabelProps) => {
  return (
    <>
      {selected && (
        <motion.div
          layoutId={'hoveredMenu'}
          className={
            'absolute inset-0 rounded-lg bg-gray-100 dark:bg-slate-950/50'
          }
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
        />
      )}

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
