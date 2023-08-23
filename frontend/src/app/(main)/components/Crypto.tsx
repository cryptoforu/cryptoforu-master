import { ArrowRightIcon } from '@heroicons/react/24/solid'

import CryptoData from '@/app/(main)/components/partials/CryptoData'
import { SectionHeader } from '@/components/content'
import { Button } from '@/components/elements'
import { Container, Section } from '@/components/wrappers'

const Crypto = () => {
  return (
    <>
      <Section
        id={'crypto-home'}
        ariaLabel={'Crypto News'}
        className={'overflow-hidden'}
      >
        <Container>
          <div
            className={
              'mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'
            }
          >
            <div className="lg:self-center lg:pr-8 lg:pt-4">
              <div className={'lg:max-w-lg'}>
                <SectionHeader
                  headingSize={'lg'}
                  title={'Cryptocurrency,'}
                  gradTitle={' Prices, News and Markets'}
                  desc={
                    'Keep up to date with live cryptocurrency prices, market data, and breaking news. We are your news and price tracker for your favorite cryptocurrencies, whether you want to learn about new cryptocurrency projects, track prices, or simply read about the latest blockchain trends.'
                  }
                  className={'mt-2'}
                  badgeLabel={'Live Prices'}
                  badgePosition={'start'}
                />
                <div
                  className={'mt-10 flex items-center justify-start gap-x-6'}
                >
                  <Button
                    variant={'solid'}
                    size={'lg'}
                    className={'rounded-full'}
                  >
                    Explore All{' '}
                    <ArrowRightIcon
                      className={'ml-2 inline-flex  h-5 w-5 justify-center'}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <CryptoData />
          </div>
        </Container>
      </Section>
    </>
  )
}
export default Crypto
