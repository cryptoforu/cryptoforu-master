'use client'
import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence initial={false} mode={'wait'}>
      {children}
    </AnimatePresence>
  )
}
