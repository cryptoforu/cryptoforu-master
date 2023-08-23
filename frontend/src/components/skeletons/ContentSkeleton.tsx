import { SingleCardSkeleton, TextSkeleton } from '@/components/skeletons'

export default function ContentSkeleton({ cards }: { cards: number }) {
  return (
    <div className={'relative py-20 sm:py-24'}>
      <div
        className={
          'container mx-auto max-w-5xl px-4 lg:max-w-8xl lg:px-12 xl:gap-x-16 xl:px-16'
        }
      >
        <TextSkeleton />
        <div className={'flex flex-col'}>
          <div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
            {Array.from(Array(cards).keys()).map((num) => (
              <SingleCardSkeleton key={num} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
