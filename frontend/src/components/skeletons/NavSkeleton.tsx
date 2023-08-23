export default function NavSkeleton() {
  return (
    <div className={'sticky top-0 !z-50 w-full'}>
      <div
        role="status"
        className={
          'flex animate-pulse items-center justify-between p-4 lg:px-8'
        }
      >
        <div className="flex lg:flex-1">
          <div className="mb-4 h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className={'hidden lg:flex'}>
          <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}
