import { create } from 'zustand'
import { redux } from 'zustand/middleware'

import type { PostActions, UsePostState } from '@/store/types/post-store'

const postState = {
  currentHeading: ' ',
  toc: undefined,
  entry: undefined,
}

const reducer = (state: UsePostState, { type, payload }: PostActions) => {
  switch (type) {
    case 'SET_HEADING':
      return { currentHeading: payload.currentHeading }
    case 'REGISTER_HEADING':
      return { toc: (state.toc = payload.content) }
    case 'UPDATE_ENTRY':
      return { entry: payload.entry }
  }
}
export type IPostStore = ReturnType<typeof usePostStore>
export const usePostStore = create(redux(reducer, postState))
