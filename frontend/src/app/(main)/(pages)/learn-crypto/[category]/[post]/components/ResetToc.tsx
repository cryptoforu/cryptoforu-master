'use client'
import { useEffect } from 'react'

import useNavigated from '@/hooks/useNavigated'
import { useArticleStore } from '@/store/useArticleStore'

const ResetToc = () => {
  const isNavigated = useNavigated()
  const dispatch = useArticleStore((state) => state.dispatch)
  useEffect(() => {
    if (isNavigated) {
      dispatch({
        type: 'CLEAR_SECTIONS',
        payload: [],
      })
    }
  }, [dispatch, isNavigated])
  return <></>
}
export default ResetToc
