'use client'
import { LayoutGroup, motion } from 'framer-motion'
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
        <LayoutGroup id={'underline'}>
          <motion.div
            layoutId="underline"
            className={
              'absolute inset-x-4 bottom-0 h-px rounded-full bg-emerald-400'
            }
          />
        </LayoutGroup>
      )}
      <span className={'relative z-10'}>{title}</span>
    </>
  )
}
export default MenuLabel
