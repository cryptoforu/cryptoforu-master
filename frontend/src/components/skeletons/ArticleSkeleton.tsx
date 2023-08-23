import ImageSkeleton from '@/components/skeletons/ImageSkeleton'
import { TextSkeleton } from '@/components/skeletons/index'

export default function ArticleSkeleton() {
  return (
    <div
      className={
        'min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-3xl lg:flex-1 lg:basis-1/2 lg:pl-8 lg:pr-0 xl:px-16'
      }
    >
      <div className={'max-w-none'}>
        <TextSkeleton />
        <div className={'mt-8'}>
          <ImageSkeleton />
        </div>
        <div className={'mt-8'}>
          <TextSkeleton />
          <TextSkeleton />
        </div>
      </div>
    </div>
  )
}
