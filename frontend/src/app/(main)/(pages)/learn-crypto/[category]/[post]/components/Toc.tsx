'use client'
import { clsx } from 'clsx'
import { ReactElement } from 'react'
import { Button } from 'react-aria-components'

import { TextSkeleton } from '@/components/skeletons'
import { Heading } from '@/components/typography'
import useScrollTo from '@/hooks/useScrollTo'
import { collectHeadings } from '@/lib/collectHeadings'
import {
  usePostController,
  useToc,
} from '@/store/controllers/usePostController'

const Toc = ({ markdown }: { markdown: ReactElement }) => {
  const toc = collectHeadings(markdown as any)
  useToc(toc)
  const { toc: tableOfContents, isActive } = usePostController()
  const scrollTo = useScrollTo()
  if (!tableOfContents) {
    return (
      <div className={'w-64 pr-8 xl:w-72 xl:pr-12'}>
        <TextSkeleton />
      </div>
    )
  }

  return (
    <nav aria-label={'On This Page'} className={'w-64 pr-8 xl:w-72 xl:pr-12'}>
      {tableOfContents.length > 0 && (
        <>
          <Heading as={'h2'} size={'sm'}>
            On This Page
          </Heading>
          <ul className={'mt-4 space-y-4'}>
            {tableOfContents.map((section) => (
              <li key={section.id}>
                <h3>
                  <Button
                    onPress={() =>
                      scrollTo({ y: `#${section.id}`, offsetY: 100 })
                    }
                    className={clsx(
                      'focus:outline-none',
                      isActive(section)
                        ? 'text-emerald-400 dark:text-emerald-400'
                        : 'text-base font-semibold text-primary-dark hover:text-slate-700 dark:text-primary-white dark:hover:text-slate-300'
                    )}
                  >
                    {section.title}
                  </Button>
                </h3>
                <ul className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                  {section.children &&
                    section.children?.length > 0 &&
                    section.children.map((subSection) => (
                      <li key={subSection.id} className={'relative'}>
                        <Button
                          onPress={() =>
                            scrollTo({ y: `#${subSection.id}`, offsetY: 100 })
                          }
                          className={clsx(
                            'block w-full pl-3.5 text-start before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full focus:outline-none',
                            isActive(subSection)
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
            ))}
          </ul>
        </>
      )}
    </nav>
  )
}
export default Toc
