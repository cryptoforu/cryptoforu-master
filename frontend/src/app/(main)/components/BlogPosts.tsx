import { ReactNode, Suspense } from 'react'

import { PostWithCategory } from '@/app/(main)/(pages)/learn-crypto/blog'
import LatestPosts from '@/app/(main)/components/partials/LatestPosts'
import { SectionSkeleton } from '@/components/skeletons'
import { Container, Section } from '@/components/wrappers'
import { getHomeData } from '@/requests/getHomeData'

const BlogPosts = async ({ children }: { children: ReactNode }) => {
  const latest_posts = (await getHomeData('latest_posts')) as PostWithCategory[]
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
