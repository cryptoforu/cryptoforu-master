import { Metadata } from 'next'
import { getCategory } from '@/app/(main)/(pages)/learn-crypto/getCategories'
import { AdPlaceholder, PrevNext } from '@/components/content'
import CategoryArticles from '@/app/(main)/(pages)/learn-crypto/components/CategoryArticles'
import { getTags } from '@/requests/getTags'
import SidebarProvider from '@/store/controllers/SidebarProvider'
import Sidebar from '@/components/sidebar/Sidebar'
import ScrollContainer from '@/app/(main)/(pages)/learn-crypto/components/ScrollContainer'
import CategoryProvider from '@/store/useCategoryStore'
import { Container } from '@/components/wrappers'
import { filterCategoryMetaData } from '@/requests/getSiteData'
import { SectionSkeleton } from '@/components/skeletons'
import dynamic from 'next/dynamic'

export const revalidate = 3600

const RelatedPosts = dynamic(
  () => import('@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'),
  {
    loading: () => <SectionSkeleton />,
  }
)

type CategoryPageProps = {
  params: {
    category: string
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  return await filterCategoryMetaData(params.category)
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  let data = await getCategory({ slug: params.category })
  const tags = await getTags()
  return (
    <CategoryProvider posts={data.posts}>
      <Container variant={'flex'}>
        <div
          className={
            'relative mx-auto flex max-w-8xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2'
          }
        >
          <ScrollContainer header={data.description}>
            <CategoryArticles />
            <PrevNext
              prev={data.category_links.prev}
              next={data.category_links.next}
            />
          </ScrollContainer>
          <SidebarProvider
            selectedType={'category_page'}
            data={{ id: data.name, tagsProps: tags }}
          >
            <Sidebar />
          </SidebarProvider>
        </div>
      </Container>
      <div className={'mx-auto max-w-5xl py-12'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
      <RelatedPosts
        related={data.related}
        title={'Related'}
        description={'Posts'}
      />
    </CategoryProvider>
  )
}
