import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { Button, TextField } from '@/components/elements'
import { Heading, Text } from '@/components/typography'

const NewsLetter = () => {
  return (
    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative isolate overflow-hidden bg-slate-200 px-6 pt-16 shadow-2xl dark:bg-gray-950 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <Heading as={'h2'} variant={'gradientFrom'} size={'lg'}>
                Subscribe to our newsletter.
              </Heading>
              <Text className={'mt-6'} variant={'secondary'}>
                With Cryptoforu, you can be sure that you are getting access to
                the best and most reliable resources for building your wealth in
                the world of blockchain. So why wait? Subscribe today and start
                exploring all that Cryptoforu has to offer.
              </Text>
              <div className="mt-4 flex w-full justify-start md:w-auto">
                <TextField
                  aria-label={'Email address'}
                  placeholder={'Email address'}
                  className={'w-60 min-w-0 shrink'}
                  variant={'primary'}
                />
                <Button
                  type="submit"
                  size={'lg'}
                  className="ml-4 flex-none justify-center text-center"
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 dark:bg-slate-950/50 dark:ring-emerald-300/25">
                  <CalendarDaysIcon
                    className="h-6 w-6 text-primary-dark dark:text-white"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-primary-dark dark:text-white">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                  All the latest news, articles, tutorials directly to your
                  inbox.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 dark:bg-slate-950/50 dark:ring-emerald-300/25">
                  <HandRaisedIcon
                    className="h-6 w-6 text-primary-dark dark:text-white"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-primary-dark dark:text-white">
                  No spam
                </dt>
                <dd className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                  We dont spam. You can unsuscribe at any time you like
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-emerald-400 to-teal-300 opacity-10"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default NewsLetter
