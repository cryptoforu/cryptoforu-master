import type { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { List, SectionHeader, SmallImageCard } from '@/components/content'
import SectionGrid from '@/components/patterns/SectionGrid'
import { Container, Section } from '@/components/wrappers'
import HoveredComponent from '@/motion/HoveredComponent'

interface RelatedPostsProps {
  related: Array<PostApiResource>
  title: string
  description: string
}

const RelatedPosts = ({ related, title, description }: RelatedPostsProps) => {
  return (
    <Section id={'related-posts'} ariaLabel={'Related Posts'}>
      <SectionGrid />
      <Container>
        <SectionHeader
          title={title}
          gradTitle={description}
          headingSize={'lg'}
          className={'ml-2.5 max-w-5xl lg:mx-0'}
        />
        <List
          items={related}
          as={'div'}
          className={
            'mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'
          }
          renderItem={(post) => (
            <SmallImageCard
              key={post.id}
              image={post.image_name}
              label={post.title}
              desc={post.introduction}
              badge={'Popular'}
              link={post.post_links.post_link}
            >
              <HoveredComponent
                id={post.title}
                layoutId={'hoverBg'}
                className={
                  'absolute inset-0 rounded-2xl bg-gray-100 dark:bg-gray-900/50'
                }
                link={post.post_links.post_link}
              />
            </SmallImageCard>
          )}
        />
      </Container>
    </Section>
  )
}
export default RelatedPosts
