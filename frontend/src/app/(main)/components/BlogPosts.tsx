import { ReactNode, Suspense } from 'react'

import { PostWithCategory } from '@/app/(main)/(pages)/learn-crypto/blog'
import { getCategories } from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'
import LatestPosts from '@/app/(main)/components/partials/LatestPosts'
import { SectionSkeleton } from '@/components/skeletons'
import { Container, Section } from '@/components/wrappers'

const BlogPosts = async ({ children }: { children: ReactNode }) => {
  const latest_posts = (await getCategories('/latest')) as PostWithCategory[]
  return (
    <Section
      id={'blog-posts'}
      ariaLabel={'Blog Posts'}
      className={'bg-white dark:bg-gray-950'}
    >
      <Container>
        {children}
        <Suspense fallback={<SectionSkeleton />}>
          <LatestPosts latest_posts={latest_posts} />
        </Suspense>
      </Container>
    </Section>
  )
}
export default BlogPosts
