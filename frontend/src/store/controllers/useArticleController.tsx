import { useCallback, useEffect } from 'react'

import { useArticleStore } from '@/store/useArticleStore'

export const useArticleController = (heading: HTMLHeadingElement) => {
  const dispatch = useArticleStore((state) => state.dispatch)

  const registerHeadings = useCallback(
    (heading) => {
      dispatch({
        type: 'REGISTER_HEADINGS',
        payload: {
          element: heading,
        },
      })
    },
    [dispatch]
  )
  const created = useCallback(
    (action: boolean) => {
      dispatch({
        type: 'CREATING_TOC',
        payload: action,
      })
    },
    [dispatch]
  )
  useEffect(() => {
    if (heading) {
      registerHeadings(heading)
      setTimeout(() => created(false), 500)
    }
  }, [created, heading, registerHeadings])
}
