import { ReactElement } from 'react'

import { IPost } from '@/app/api/blog/blog'
import { PrevNext } from '@/components/content'

interface PostMainContent {
  children: ReactElement
  post_links: IPost['post_links']
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
