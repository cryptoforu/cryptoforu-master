import { Suspense } from 'react'

import LatestPosts from '@/app/(main)/components/partials/LatestPosts'
import SubscribeHeader from '@/app/(main)/components/partials/SubscribeHeader'
import { SectionSkeleton } from '@/components/skeletons'
import { Container, Section } from '@/components/wrappers'

const BlogPosts = () => {
  return (
    <Section
      id={'blog-posts'}
      ariaLabel={'Blog Posts'}
      className={'bg-white dark:bg-gray-950'}
    >
      <Container>
        <SubscribeHeader />
        <Suspense fallback={<SectionSkeleton />}>
          <LatestPosts />
        </Suspense>
      </Container>
    </Section>
  )
}
export default BlogPosts
