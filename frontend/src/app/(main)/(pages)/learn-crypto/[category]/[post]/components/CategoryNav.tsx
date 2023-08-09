import { List, ListItem } from '@/components/content'
import type { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import { Heading } from '@/components/typography'
import { InternalLink } from '@/components/elements'
import { Route } from 'next'

const CategoriesNav = ({
  categories,
}: {
  categories: CategoryApiResource[]
}) => {
  return (
    <nav
      aria-label={'Categories'}
      className={'mt-8 w-64 pr-8 xl:w-72 xl:pr-12'}
    >
      <Heading as={'h2'} size={'sm'}>
        Categories
      </Heading>
      <List
        className={
          'mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'
        }
        items={categories}
        renderItem={(category) => (
          <>
            <li key={category.id} className={'relative'}>
              <ListItem
                as={InternalLink}
                href={`/learn-crypto/${category.slug}` as Route}
                activeClasses={
                  'text-slate-500 before:hidden before:bg-emerald-300 hover:text-emerald-600 hover:before:block dark:text-slate-400 dark:before:bg-emerald-400 dark:hover:text-emerald-400'
                }
              >
                {category.name}
              </ListItem>
            </li>
          </>
        )}
      />
    </nav>
  )
}
export default CategoriesNav