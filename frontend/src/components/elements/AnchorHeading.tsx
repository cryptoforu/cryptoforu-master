'use client'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from 'react-merge-refs'

import { Heading } from '@/components/typography'
import type { IHeadingProps } from '@/components/typography/Heading'
import { useArticleController } from '@/store/controllers/useArticleController'
import { useArticleStore } from '@/store/useArticleStore'

export default function AnchorHeading(props: IHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useArticleController(headingRef?.current)
  const dispatch = useArticleStore((state) => state.dispatch)
  const { ref } = useInView({
    threshold: 0.6,
    onChange: (inView, entry) => {
      if (inView) {
        dispatch({
          type: 'ACTIVE_HEADING',
          payload: entry.target.id,
        })
      }
    },
  })

  const elementRef = mergeRefs([ref, headingRef])
  return <Heading ref={elementRef} {...props} />
}
