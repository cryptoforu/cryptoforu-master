import { Container, Section } from '@/components/wrappers'
import { SectionHeader } from '@/components/content'
import { getData, preload } from '@/lib/getData'
import { CoinProvider } from '@/store/useCoinsStore'
import TopCoins from '@/app/(main)/components/partials/TopCoins'

preload(
  'crypto?filter[data_name]=all_coins&only=bitcoin,ethereum,solana,cardano,binance-coin'
)
const Crypto = async () => {
  const { data } = await getData(
    'crypto?filter[data_name]=all_coins&only=bitcoin,ethereum,solana,cardano,binance-coin'
  )

  return (
    <CoinProvider data={data}>
      <Section id={'crypo-home'} ariaLabel={'Crypto News'}>
        <Container variant={'secondary'}>
          <div
            className={
              'mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'
            }
          >
            <div className="lg:pr-8 lg:pt-4">
              <div className={'lg:max-w-lg'}>
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
            </div>
            <div className={'mt-8'}>
              <TopCoins />
            </div>
          </div>
        </Container>
      </Section>
    </CoinProvider>
  )
}
export default Crypto
