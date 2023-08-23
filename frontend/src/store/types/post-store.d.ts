export type TableOfContents = {
  id: string
  title: string
  children?: {
    id: string
    title: string
  }[]
}

export type UsePostState = {
  currentHeading?: string
  toc?: TableOfContents[]
  entry?: IntersectionObserverEntry
}
type HeadingActions = {
  type: 'SET_HEADING'
  payload: {
    currentHeading: string
  }
}
type RegisterAction = {
  type: 'REGISTER_HEADING'
  payload: {
    content: TableOfContents[]
  }
}

type EntryAction = {
  type: 'UPDATE_ENTRY'
  payload: {
    entry?: IntersectionObserverEntry
  }
}

export type PostActions = HeadingActions | RegisterAction | EntryAction
