import PageHeader from '@/app/(main)/(pages)/SharedComponents/PageHeader'
import { HeroPattern } from '@/components/content'
import { getBreadcrumbs, preloadBreadcrumbs } from '@/requests/getBreadcrumbs'

preloadBreadcrumbs()

const PageHero = async () => {
  const crumbs = await getBreadcrumbs()
  return (
    <div
      className={
        'relative isolate mt-[-4.5rem] overflow-hidden bg-primary-white pb-24 pt-[4.5rem] dark:bg-slate-950 lg:mt-[-4.75rem] lg:pt-[4.75rem]'
      }
    >
      <PageHeader crumbs={crumbs} />
      <HeroPattern />
      <div className="absolute inset-x-0 bottom-[-2px] z-10 origin-center scale-[2] overflow-hidden sm:-bottom-px">
        <svg
          viewBox="0 0 2880 48"
          fill="currentColor"
          className="-mb-1 w-full text-cyan-50 opacity-95 dark:text-primary-dark"
          preserveAspectRatio="none"
        >
          <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" />
        </svg>
      </div>
    </div>
  )
}
export default PageHero
