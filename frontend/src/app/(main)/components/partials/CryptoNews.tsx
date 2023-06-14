import { Card } from '@/components/content'
import type { DecryptNews } from '@/types/shared-types'
import Image from 'next/image'
import { Heading, Text } from '@/components/typography'
import { Link } from '@/components/elements'

interface CryptoNewsProps {
  latest_news: DecryptNews[]
}

const CryptoNews = ({ latest_news }: CryptoNewsProps) => {
  return latest_news.map((news) => (
    <Card
      key={news.title}
      className={
        'flex max-w-sm shrink-0 grow-0 items-start justify-start gap-1 p-4'
      }
    >
      <div className={'flex grow flex-col items-center justify-start gap-6'}>
        <div
          className={
            'relative flex max-h-96 shrink-0 grow-0 items-start justify-start gap-1 self-stretch'
          }
        >
          <Image
            src={news.enclosure['@attributes'].url}
            alt={news.title}
            className={
              'h-auto max-w-full shrink-0 grow-0 self-stretch rounded-xl'
            }
            width={1024}
            height={512}
          />
        </div>
        <Heading size={'sm'} className={'line-clamp-1'}>
          {news.title}
        </Heading>
        <Text className={'line-clamp-2'}>{news.description}</Text>
        <Link
          isInternal={false}
          href={news.link}
          solid={'secondary'}
          className={'w-full opacity-80 hover:scale-105'}
          label={'Read More'}
        />
      </div>
    </Card>
  ))
}
export default CryptoNews
