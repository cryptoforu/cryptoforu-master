import { PrevNext } from '@/components/content'
import { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { JSXElementConstructor, ReactElement } from 'react'

interface PostMainContent {
  children: ReactElement<any, string | JSXElementConstructor<any>>
  post_links: PostApiResource['post_links']
}

export default async function PostMainContent({
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
