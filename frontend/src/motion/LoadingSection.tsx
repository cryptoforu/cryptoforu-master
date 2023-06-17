'use client'

import Spinner from '@/motion/Spinner'

const LoadingSection = () => {
  return (
    <div className={'relative'}>
      <div
        className={
          'container mx-auto max-w-5xl px-4 lg:max-w-8xl lg:px-12  xl:gap-x-16 xl:px-16'
        }
      >
        <div
          className={
            'flex h-[80vh] w-full animate-pulse items-center justify-center rounded-lg bg-slate-300 dark:bg-slate-900'
          }
        >
          <Spinner />
        </div>
      </div>
    </div>
  )
}
export default LoadingSection
