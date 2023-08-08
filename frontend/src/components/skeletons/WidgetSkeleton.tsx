export default function WidgetSkeleton({
  numberOfLines = 5,
}: {
  numberOfLines: number
}) {
  return (
    <div
      role={'status'}
      className={
        'max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6'
      }
    >
      {Array.from(Array(numberOfLines).keys()).map((key) => (
        <div
          key={key}
          className="mb-2.5 h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  )
}
