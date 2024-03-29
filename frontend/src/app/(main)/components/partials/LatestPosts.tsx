import { getLatest } from '@/app/api/blog/blogRoutes'
import BlogCard from '@/components/content/BlogCard'
import HorizontalCard from '@/components/content/HorizontalCard'
import { Container } from '@/components/wrappers'

const LatestPosts = async () => {
  const latestPosts = await getLatest()
  return (
    <Container className={'pt-16'}>
      <div className={'grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4'}>
        <div className={'hidden md:block'}>
          <BlogCard
            image={latestPosts[0].image_name}
            heading={latestPosts[0].title}
            description={latestPosts[0].introduction}
            link={latestPosts[0].post_links.post_link}
            date={latestPosts[0].updated_at}
            reading_time={latestPosts[0].reading_time}
          />
        </div>
        <div className={'space-y-6 lg:mx-auto lg:w-3/4'}>
          {latestPosts.slice(1).map((post) => (
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
