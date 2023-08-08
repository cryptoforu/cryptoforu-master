import { HomeIcon } from '@heroicons/react/24/outline'
import NextLink from 'next/link'
import { InternalLink } from '@/components/elements'
import { Route } from 'next'
import { ReturnedCrumbs } from '@/store/types/crumbs-store'

const BreadCrumbs = ({ breadcrumbs }: { breadcrumbs: ReturnedCrumbs }) => {
  let headline = breadcrumbs.label.split('|')
  return (
    <div
      className={
        'absolute inset-x-0 bottom-12 z-10 flex justify-center overflow-hidden'
      }
    >
      <div className={'flex items-center'}>
        <NextLink
          href={'/'}
          className={'text-primary-dark dark:text-primary-white'}
        >
          <HomeIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </NextLink>
      </div>
      {breadcrumbs.parents !== null && (
        <div key={breadcrumbs.parents.label} className={'flex items-center'}>
          <svg
            className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <InternalLink href={breadcrumbs.parents.route as Route}>
            {breadcrumbs.parents.label}
          </InternalLink>
        </div>
      )}
      <div className={'flex items-center'}>
        <svg
          className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <InternalLink href={breadcrumbs.route as Route}>
          {headline[0]} {''}
          <span className={'text-emerald-400 dark:text-emerald-500'}>
            {headline[1]}
          </span>
        </InternalLink>
      </div>
    </div>
  )
}
export default BreadCrumbs
