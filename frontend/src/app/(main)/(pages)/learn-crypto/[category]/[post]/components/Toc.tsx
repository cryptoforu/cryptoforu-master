'use client'
import { clsx } from 'clsx'
import { useDeferredValue } from 'react'
import { Button } from 'react-aria-components'

import { List } from '@/components/content'
import { TextSkeleton } from '@/components/skeletons'
import { Heading } from '@/components/typography'
import useScrollTo from '@/hooks/useScrollTo'
import { useArticleStore } from '@/store/useArticleStore'

const Toc = () => {
  const toc = useArticleStore((state) => state.sections)
  const activeHeading = useArticleStore((state) => state.activeHeading)
  const creating = useArticleStore((state) => state.creatingToc)
  const tableOfContents = useDeferredValue(toc)
  const scrollTo = useScrollTo()

  function isActive(id: string) {
    return activeHeading === id
  }

  if (creating) {
    return <TextSkeleton />
  }
  return (
    <nav aria-label={'On This Page'} className={'w-64 pr-8 xl:w-72 xl:pr-12'}>
      <Heading as={'h2'} size={'sm'}>
        On This Page
      </Heading>
      {tableOfContents.length > 0 && (
        <List
          className={'mt-4 space-y-4'}
          items={tableOfContents}
          renderItem={(section) =>
            !section.children.length ? (
              <li key={section.id}>
                <Heading as={'h3'} size={'xs'} variant={'slate'}>
                  <Button
                    onPress={() =>
                      scrollTo({ y: `#${section.id}`, offsetY: 100 })
                    }
                    className={clsx(
                      'pl-1 focus:outline-none',
                      isActive(section.id)
                        ? 'text-emerald-400 dark:text-emerald-400'
                        : 'text-start font-semibold text-slate-700 hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-100'
                    )}
                  >
                    {section.title}
                  </Button>
                </Heading>
              </li>
            ) : (
              <li key={section.id}>
                <Heading as={'h3'} size={'xs'} variant={'slate'}>
                  <Button
                    onPress={() =>
                      scrollTo({ y: `#${section.id}`, offsetY: 100 })
                    }
                    className={clsx(
                      'pl-1 focus:outline-none',
                      isActive(section.id)
                        ? 'text-emerald-400 dark:text-emerald-400'
                        : 'text-start font-semibold text-slate-700 hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-100'
                    )}
                  >
                    {section.title}
                  </Button>
                </Heading>
                <ul
                  key={section.id}
                  className={
                    'mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'
                  }
                >
                  {section.children.map((subSection) => (
                    <li key={subSection.id} className={'relative'}>
                      <Button
                        onPress={() =>
                          scrollTo({ y: `#${subSection.id}`, offsetY: 100 })
                        }
                        className={clsx(
                          'block w-full pl-3.5 text-start before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full focus:outline-none',
                          isActive(subSection.id)
                            ? 'font-semibold text-emerald-500 before:bg-emerald-500'
                            : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        )}
                      >
                        {subSection.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            )
          }
        />
      )}
    </nav>
  )
}
export default Toc
