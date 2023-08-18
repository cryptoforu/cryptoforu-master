import type { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import BlogCard from '@/components/content/BlogCard'
import HorizontalCard from '@/components/content/HorizontalCard'
import { Container } from '@/components/wrappers'

const LatestPosts = ({
  latest_posts,
}: {
  latest_posts: Array<PostApiResource>
}) => {
  return (
    <Container className={'pt-16'}>
      <div className={'grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4'}>
        <div>
          <BlogCard
            image={latest_posts[0].image_name}
            heading={latest_posts[0].title}
            description={latest_posts[0].introduction}
            link={latest_posts[0].post_links.post_link}
            date={latest_posts[0].updated_at}
            reading_time={latest_posts[0].reading_time}
          />
        </div>
        <div className={'space-y-6 lg:mx-auto lg:w-3/4'}>
          {latest_posts.slice(1).map((post) => (
            <HorizontalCard
              key={post.slug}
              image={post.image_name}
              title={post.title}
              description={post.introduction}
              link={post.post_links.post_link}
              time={post.reading_time}
              date={post.created_at}
              tags={post.tags}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
export default LatestPosts
