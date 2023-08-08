'use client'
import { create } from 'zustand'
import createSelectors from '@/store/createSelectors'

type UseBackToTopState = {
  showBtn: boolean
}

type UseBackToTopActions = {
  setShowBtn: (action: boolean) => void
}

interface UseBackToTopStore extends UseBackToTopState, UseBackToTopActions {}

const useBackToTopStore = create<UseBackToTopStore>()((set, get) => ({
  showBtn: false,
  setShowBtn: (action) => set(() => ({ showBtn: action })),
}))

export const useBackToTop = createSelectors(useBackToTopStore)
