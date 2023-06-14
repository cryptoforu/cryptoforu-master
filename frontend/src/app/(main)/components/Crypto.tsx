import { Container, Section } from '@/components/wrappers'
import { CryptoCard, SectionHeader } from '@/components/content'
import CryptoNews from '@/app/(main)/components/partials/CryptoNews'
import { getData, preload } from '@/lib/getData'
import type { CryptoCoin, DecryptNews } from '@/types/shared-types'

export interface CryptoData {
  popular: CryptoCoin[]
  latest_news: DecryptNews[]
}

preload(
  'crypto/popular?filter[data_name]=all_coins&fields[cryptos]=data_values'
)
const Crypto = async () => {
  const data = await getData(
    'crypto/popular?filter[data_name]=all_coins&fields[cryptos]=data_values'
  )
  const { popular, latest_news }: CryptoData = data
  return (
    <Section id={'crypo-home'} ariaLabel={'Crypto News'}>
      <Container>
        <div className={'mt-4 grid grid-cols-1 gap-8 pt-10 lg:grid-cols-2'}>
          <div className={'relative mx-auto max-w-2xl lg:mx-0'}>
            <SectionHeader
              headingSize={'lg'}
              title={'Latest Cryptocurrency,'}
              gradTitle={' Prices, News, Markets'}
              desc={
                'Keep up to date with live cryptocurrency prices, market data, and breaking news. We are your news and price tracker for your favorite cryptocurrencies, whether you want to learn about new cryptocurrency projects, track prices, or simply read about the latest blockchain trends.'
              }
              className={'text-center md:text-left'}
            />
          </div>
          <div className={'mt-4 flex flex-wrap justify-center gap-4'}>
            {Object.values(popular).map((value) => (
              <CryptoCard
                key={value.id}
                name={value.name}
                icon={value.image}
                price={value.current_price}
                change={value.price_change_percentage_24h}
              />
            ))}
          </div>
        </div>
        <div className={'mt-8'}>
          <div className={'flex flex-wrap justify-center gap-4'}>
            <CryptoNews latest_news={latest_news} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
export default Crypto
