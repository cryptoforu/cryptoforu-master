import dynamic from 'next/dynamic'

import WidgetSkeleton from '@/components/skeletons/WidgetSkeleton'

const SidebarComponents = dynamic(
  () => import('@/components/sidebar/SidebarComponents'),
  {
    loading: () => <WidgetSkeleton numberOfLines={15} />,
  }
)
const Sidebar = () => {
  return (
    <div className="hidden w-full shrink grow-0 px-2 sm:w-[26rem] xl:block">
      <div
        className={
          'hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6'
        }
      >
        <div className={'flex flex-col gap-y-4'}>
          <SidebarComponents />
        </div>
      </div>
    </div>
  )
}
export default Sidebar
