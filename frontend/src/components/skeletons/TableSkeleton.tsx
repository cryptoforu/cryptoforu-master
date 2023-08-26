export default function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className={'mt-2 overflow-x-auto lg:overflow-hidden'}>
      <div className={'inline-block min-w-full'}>
        <div
          className={
            'mt-4 overflow-x-auto rounded-xl shadow-sm ring-1 ring-black/5'
          }
        >
          <div
            className={
              'min-w-full table-auto divide-y divide-slate-300 dark:divide-slate-900'
            }
          >
            <div className={'w-full animate-pulse px-4 py-3'} />
            <div
              className={'divide-y divide-slate-200 pl-4 dark:divide-slate-900'}
            >
              {Array.from(Array(rows).keys()).map((row) => (
                <div key={row} className={'px-4 py-3'}>
                  <div
                    className={
                      'h-4 w-full animate-pulse bg-slate-300 dark:bg-slate-700'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
