export function SingleArticleSkeleton() {
  return (
    <div className={'group relative flex flex-col items-start md:col-span-3'}>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default function CategoryArticlesSkeleton({ cards }: { cards: number }) {
  return (
    <div className={'md:grid md:grid-cols-4 md:items-baseline'}>
      {Array.from(Array(cards).keys()).map((num) => (
        <SingleArticleSkeleton key={num} />
      ))}
    </div>
  )
}
