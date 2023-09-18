import { EyeIcon } from '@heroicons/react/20/solid'

import { IPost } from '@/app/api/blog/blog'
import {
  ArticleCard,
  ArticleCta,
  ArticleDescription,
  ArticleEye,
  ArticleTitle,
} from '@/components/content'
import { DateFormatter } from '@/components/misc/DateFormatter'
import { Text } from '@/components/typography'

const CategoryArticles = ({ post }: { post: IPost }) => {
  return (
    <div
      className={'md:grid md:grid-cols-4 md:items-baseline'}
      id={post.id.toString()}
      key={post.id}
    >
      <ArticleCard as={'div'} className={'md:col-span-3'}>
        <div
          className={
            'absolute right-0 top-0 z-20 flex items-center justify-between gap-2'
          }
        >
          <EyeIcon className={'h-5 w-5 text-slate-600 dark:text-slate-500'} />{' '}
          <Text variant={'secondary'}>
            {post.count !== null ? post.count.views : 0}
          </Text>
        </div>
        <ArticleTitle>{post.title}</ArticleTitle>
        <ArticleEye decorate={true}>{post.reading_time}</ArticleEye>
        <ArticleDescription>{post.introduction}</ArticleDescription>
        <ArticleCta>Read Article</ArticleCta>
      </ArticleCard>
      <ArticleEye as={'time'} decorate={false} className="mt-1 hidden md:block">
        <DateFormatter date={post.created_at} />
      </ArticleEye>
    </div>
  )
}
export default CategoryArticles
