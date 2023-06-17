'use client'

import { createStore, useStore } from 'zustand'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type SliderID = {
  id: number
}

type SliderContextData<SliderItems extends SliderID> = {
  sliderData: Array<SliderItems>
}

interface SliderActions extends SliderContextData<SliderID> {
  page: number
  direction: number
  setPage: (direction: number) => void
  paginate: (direction: number) => void
  getCurrent: () => SliderID | undefined
}

type SliderStore = ReturnType<typeof createSliderStore>
const createSliderStore = (
  initProps?: Partial<SliderContextData<SliderID>>
) => {
  const DEFAULT_PROPS: SliderContextData<SliderID> = {
    sliderData: [],
  }
  return createStore<SliderActions>((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    page: 0,
    direction: 1,
    setPage: (direction) =>
      set((state) => ({
        page: state.page > 1 ? 0 : state.page + 1,
        direction: direction,
      })),
    paginate: (direction) =>
      set((state) => ({ page: state.page + direction, direction: direction })),
    getCurrent: () => {
      return get().sliderData.find((element) => element.id === get().page)
    },
  }))
}

export const SliderContext = createContext<SliderStore | null>(null)

type SliderProviderProps<SliderItems extends SliderID> = {
  sliderData: Array<SliderItems>
}

export function SliderProvider<SliderItems extends SliderID>({
  sliderData,
  children,
}: PropsWithChildren<SliderProviderProps<SliderItems>>) {
  let [sliderStore] = useState(() => createSliderStore({ sliderData }))
  const setPage = sliderStore.getState().setPage
  const page = sliderStore.getState().page
  useEffect(() => {
    const nextSlide = () => {
      setPage(1)
    }
    const interval = setInterval(nextSlide, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [setPage, page])
  return (
    <SliderContext.Provider value={sliderStore}>
      {children}
    </SliderContext.Provider>
  )
}

export function useSliderContext<T>(
  selector: (state: SliderActions) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(SliderContext)
  if (!store) throw new Error('Missing SliderContext  Provider in the tree')
  return useStore(store, selector, equalityFn)
}
