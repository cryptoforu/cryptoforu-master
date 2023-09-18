import { WidgetSkeleton } from '@/components/skeletons'

export default function SidebarSkeleton() {
  return (
    <div className="hidden w-full shrink grow-0 px-2 sm:w-[26rem] xl:block">
      <div
        className={
          'hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6'
        }
      >
        <div className={'flex flex-col gap-y-4'}>
          <WidgetSkeleton numberOfLines={10} />
        </div>
      </div>
    </div>
  )
}
