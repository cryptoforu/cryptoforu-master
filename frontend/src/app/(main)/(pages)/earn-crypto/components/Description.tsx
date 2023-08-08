import {
  BanknotesIcon,
  GlobeAltIcon,
  WalletIcon,
} from '@heroicons/react/20/solid'
import { Heading, Prose, Text } from '@/components/typography'
import SectionGrid from '@/components/patterns/SectionGrid'
import AppLogo from '@/components/AppLogo'

const Description = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <SectionGrid />
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <Text variant={'emerald'}>Earn Crypto</Text>
                <Heading as={'h2'} size={'lg'} className={'mt-2'}>
                  Cryptoforu Earning Methods
                </Heading>
                <Text size={'lg'} className={'mt-6'}>
                  Best crypto earning methods provided by Cryptoforu. We present
                  you with best online programs for building your passive income
                  online.
                </Text>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-[4.5rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <div className="max-h-[700px] w-[48rem] max-w-none rounded-xl bg-slate-50 p-16 shadow-xl transition-shadow hover:shadow-md hover:shadow-slate-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5">
              <AppLogo variant={'base_logo'} className={'h-auto max-w-full'} />
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <Prose className="max-w-xl lg:max-w-lg">
                <p>
                  With this programs and some effort you can start earning your
                  first income online in no time. Choose from our lists of Top
                  10 Crypto Faucets, Shortlink Services, AdNetworks and many
                  more different ways.
                </p>
                <ul role="list" className="mt-8 space-y-8">
                  <li className="flex gap-x-3">
                    <BanknotesIcon
                      className="mt-1 h-5 w-5 flex-none text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Always double check.</strong>
                      {'  '}
                      We are not financial advising company, we just write
                      reviews so if you decide to invest in some of this
                      programs, do it at your own risk.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <WalletIcon
                      className="mt-1 h-5 w-5 flex-none text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Keep your crypto wallet seed phrase safe.</strong>
                      {'  '}
                      If you lose your hardware wallet or mobile phone, you can
                      only recover your bitcoins by using this recovery seed.
                      Many users make the mistake of skipping this step when
                      creating a Bitcoin wallet, and as a result, they lose
                      access to their bitcoins in the long run.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <GlobeAltIcon
                      className="mt-1 h-5 w-5 flex-none text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Keep up to date with the crypto world.</strong>
                      {'  '}
                      This is the place to stay up to date on key announcements
                      about token listings and everything else going on in the
                      crypto world. Twitter is an essential tool for keeping up
                      with whats going on in both the crypto space and,
                      arguably, the world at large.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  We only provide you with legitimate projects that we have
                  tested, so you wont be taken in by a scam. Check
                  cryptocurrency Addresses twice. Whenever you send a
                  transaction, some malicious programmes can edit and paste an
                  incorrect transaction address. The new address is usually that
                  of an attacker.It is always better to be safe than sorry.
                </p>
                <h3>How we helped?</h3>
                <p className="mt-6">
                  This is just some basic guidelines to get you started. Dont be
                  afraid to explore and learn everyday. If you want to make
                  something out of the crypto you will need to take the risk!
                </p>
              </Prose>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Description
