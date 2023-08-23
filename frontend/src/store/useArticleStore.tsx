'use client'
import { produce } from 'immer'
import { create } from 'zustand'
import { redux } from 'zustand/middleware'

export type HeadingProps = {
  id: string
  title: string
  children?: HeadingProps[]
}
type ArticleToc = {
  sections: HeadingProps[]
  activeHeading: string
  creatingToc: boolean
}
type ArticleTocActions = {
  type: 'REGISTER_HEADINGS'
  payload: {
    element: HTMLHeadingElement
  }
}
type ActiveHeadingAction = {
  type: 'ACTIVE_HEADING'
  payload: string
}
type CreateAction = {
  type: 'CREATING_TOC'
  payload: boolean
}
type ClearSections = {
  type: 'CLEAR_SECTIONS'
  payload: []
}
type DispatchProps =
  | ArticleTocActions
  | ActiveHeadingAction
  | CreateAction
  | ClearSections

const initialSections: ArticleToc = {
  sections: [],
  activeHeading: '',
  creatingToc: true,
}
const reducer = articleReducer()

export const useArticleStore = create(redux(reducer, initialSections))

function articleReducer() {
  return produce<ArticleToc, [DispatchProps]>((draft, action) => {
    switch (action.type) {
      case 'REGISTER_HEADINGS':
        {
          if (action.payload.element.localName === 'h3') {
            if (!draft.sections[draft.sections.length - 1]) {
              return
            }
            draft.sections[draft.sections.length - 1].children.push({
              id: action.payload.element.id,
              title: action.payload.element.innerText,
            })
          } else {
            draft.sections.push({
              id: action.payload.element.id,
              title: action.payload.element.innerText,
              children: [],
            })
          }
        }
        break
      case 'ACTIVE_HEADING':
        draft.activeHeading = action.payload
        break
      case 'CREATING_TOC':
        draft.creatingToc = action.payload
        break
      case 'CLEAR_SECTIONS':
        draft.sections = action.payload
        break
      default:
        break
    }
  })
}
