import SubscribeHeader from '@/app/(main)/components/partials/SubscribeHeader'
import LatestPosts from '@/app/(main)/components/partials/LatestPosts'
import type { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { Container, Section } from '@/components/wrappers'

const BlogPosts = ({ latest_posts }: { latest_posts: PostApiResource[] }) => {
  return (
    <Section
      id={'blog-posts'}
      ariaLabel={'Blog Posts'}
      className={'bg-white dark:bg-gray-950'}
    >
      <Container>
        <SubscribeHeader />
        <LatestPosts latest_posts={latest_posts} />
      </Container>
    </Section>
  )
}
export default BlogPosts
