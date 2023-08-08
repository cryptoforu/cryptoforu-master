import { createStore, useStore } from 'zustand'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type UseImageSliderContext = {
  sliderData: {
    images: string[]
    title?: string[]
    rating?: string[]
  }
}

type UseImageSliderState = {
  page: number
  direction: number
  autoplay: boolean
}

type UseImageSliderActions = {
  paginate: (newDirection: number) => void
  swipePower: (offset: number, velocity: number) => number
  setAutoPlay: (action: boolean) => void
}

interface IImageSlider
  extends UseImageSliderContext,
    UseImageSliderState,
    UseImageSliderActions {}

type IImageSliderStore = ReturnType<typeof createImageSliderStore>
const createImageSliderStore = (initProps?: Partial<UseImageSliderContext>) => {
  const DEFAULT_PROPS: UseImageSliderContext = {
    sliderData: {
      images: [],
      title: [],
      rating: [],
    },
  }
  return createStore<IImageSlider>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    page: 0,
    direction: 0,
    autoplay: true,
    paginate: (newDirection) =>
      set((state) => ({
        page: state.page + newDirection,
        direction: newDirection,
      })),
    swipePower: (offset, velocity) => {
      return Math.abs(offset) * velocity
    },
    setAutoPlay: (action) => set(() => ({ autoplay: action })),
  }))
}

const SliderContext = createContext<IImageSliderStore | null>(null)

export function ImageSliderProvider({
  children,
  ...props
}: PropsWithChildren<UseImageSliderContext>) {
  let [sliderStore] = useState(() => createImageSliderStore(props))
  return (
    <SliderContext.Provider value={sliderStore}>
      {children}
    </SliderContext.Provider>
  )
}

export function useImageSliderContext<T>(
  selector: (state: IImageSlider) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(SliderContext)
  if (!store) throw new Error('Missing SliderProvider in the tree')
  return useStore(store, selector, equalityFn)
}
