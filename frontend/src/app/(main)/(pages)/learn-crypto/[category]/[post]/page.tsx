import { Metadata, Route } from 'next'
import { getArticle } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/getPosts'
import {
  PostMainContent,
  PostSidebar,
  Toc,
} from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components'
import PostHeader from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/PostHeader'
import useMarkdown from '@/hooks/useMarkdown'
import { BtnLink, ResponsiveImage } from '@/components/elements'
import { Heading, Prose } from '@/components/typography'
import { AnchorLink } from '@/components/elements/Link'
import { getCategories } from '@/app/(main)/(pages)/learn-crypto/getCategories'
import CategoryNav from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/CategoryNav'
import { filterPostMetaData, getSiteData } from '@/requests/getSiteData'
import AnimatedImage from '@/motion/AnimatedImage'
import dynamic from 'next/dynamic'
import { SectionSkeleton } from '@/components/skeletons'
import { AdPlaceholder } from '@/components/content'
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid'

const RelatedPosts = dynamic(
  () => import('@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'),
  {
    loading: () => <SectionSkeleton />,
  }
)

type PostPageProps = {
  params: {
    category: string
    post: string
  }
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  return await filterPostMetaData(params.post)
}

export async function generateStaticParams() {
  const posts = await getSiteData('filter[params]=id,category_id,slug', 5)
  return posts.map((post) => ({
    category: post.category.slug,
    post: post.slug,
  }))
}

export default async function Post({ params }: PostPageProps) {
  const data = await getArticle({ slug: params.post })
  const categories = await getCategories('fields[categories]=id,name,slug')
  const markdown = useMarkdown(data.content, {
    components: {
      a: (props: any) => <AnchorLink {...props} />,
      img: (props: any) => <ResponsiveImage src={props.src} alt={props.alt} />,
      h1: (props: any) => <Heading as={'h1'} size={'xl'} {...props} />,
      h2: (props: any) => (
        <Heading as={'h2'} size={'lg'} className={'group flex'} {...props} />
      ),
      h3: (props: any) => (
        <Heading as={'h3'} size={'md'} className={'group flex'} {...props} />
      ),
    },
  })
  return (
    <>
      <div
        className={
          'relative mx-auto flex max-w-9xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2'
        }
      >
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="sticky top-[4.9rem] -ml-0.5 h-[calc(100vh-4.9rem)] overflow-y-auto overflow-x-hidden py-8 pl-4">
            <div className="absolute bottom-0 right-0 top-8 hidden w-px bg-slate-800 dark:block" />
            <Toc markdown={markdown} />
            <CategoryNav categories={categories} />
          </div>
        </div>
        <div
          className={
            'min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16'
          }
        >
          <Prose>
            <div className={'not-prose relative'}>
              <BtnLink
                href={`/learn-crypto/${data.category?.slug}` as Route}
                className={'absolute -top-12 left-0'}
                variant={'solid'}
                colorScheme={'secondary'}
              >
                <ArrowSmallLeftIcon className={'mr-1 h-5 w-5'} />
                <span>Back</span>
              </BtnLink>
            </div>
            <PostHeader
              headline={data.headline.split('|')}
              updated={data.updated_at}
              reading_time={data.reading_time}
            >
              {data.introduction}
            </PostHeader>
            <AnimatedImage
              src={data.image_name}
              alt={data.title}
              width={1000}
              height={600}
            />
            <PostMainContent post_links={data.post_links}>
              {markdown}
            </PostMainContent>
          </Prose>
        </div>
        <PostSidebar post={data} />
      </div>
      <div className={'mx-auto max-w-5xl py-12'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
      <RelatedPosts
        related={data.related}
        title={'Related'}
        description={'Posts'}
      />
    </>
  )
}
