import Image from 'next/image'

const ad_sizes = {
  square: {
    width: 200,
    height: 200,
  },
  banner: {
    width: 468,
    height: 60,
  },
  leaderboard: {
    width: 728,
    height: 90,
  },
  inline_rectangle: {
    width: 350,
    height: 250,
  },
  skyscraper: {
    width: 120,
    height: 600,
  },
  w_skyscraper: {
    width: 160,
    height: 600,
  },
}
type AdProps = {
  ad: keyof typeof ad_sizes
}
const AdPlaceholder = ({ ad = 'inline_rectangle' }: AdProps) => {
  let maxWidth = (ad_sizes[ad].width + 10).toString()
  return (
    <div
      className={`mx-auto overflow-hidden`}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}placeholder/${ad_sizes[ad].width}/${ad_sizes[ad].height}`}
        alt={'ad placeholder'}
        width={ad_sizes[ad].width}
        height={ad_sizes[ad].height}
        className={
          'max-h-full max-w-full rounded shadow-lg shadow-cyan-100 dark:shadow-slate-800/50'
        }
      />
    </div>
  )
}
export default AdPlaceholder
