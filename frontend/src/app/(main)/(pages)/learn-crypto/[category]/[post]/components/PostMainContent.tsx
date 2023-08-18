import { JSXElementConstructor, ReactElement } from 'react'

import { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { PrevNext } from '@/components/content'

interface PostMainContent {
  children: ReactElement<any, string | JSXElementConstructor<any>>
  post_links: PostApiResource['post_links']
}

export default function PostMainContent({
  children,
  post_links,
}: PostMainContent) {
  return (
    <>
      {children}
      <div className={'mx-auto mt-16 max-w-2xl'}>
        <PrevNext prev={post_links.prev} next={post_links.next} />
      </div>
    </>
  )
}
