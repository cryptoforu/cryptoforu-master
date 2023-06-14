import GridPattern from '@/components/patterns/GridPattern'
import Heading from '@/components/typography/Heading'
import Text from '@/components/typography/Text'
import { OutlineButton, SolidButton } from '@/components/elements/Button'
import { detacher } from '@/data/fonts'

function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
          <GridPattern
            width={72}
            height={56}
            x="-12"
            y="4"
            squares={[
              [4, 3],
              [2, 1],
              [7, 3],
              [10, 6],
            ]}
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
          />
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </svg>
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <div
      className={
        'relative isolate mt-[-4.5rem] overflow-hidden bg-primary-white pb-32 pt-[4.5rem] dark:bg-primary-dark lg:mt-[-4.75rem] lg:pt-[4.75rem]'
      }
    >
      <div
        className={
          'container mx-auto max-w-5xl px-4 py-16 lg:max-w-8xl lg:px-12 lg:py-24 xl:gap-x-16 xl:px-16'
        }
      >
        <div className={'text-center'}>
          <Heading as={'h1'} size={'xxl'} className={detacher.className}>
            Cryptoforu
          </Heading>
          <Heading
            as={'h2'}
            variant={'slate'}
            size={'xl'}
            className={`mx-auto mt-8 max-w-4xl ${detacher.className}`}
          >
            <span className="relative whitespace-nowrap text-emerald-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-emerald-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Learn and Earn</span>
            </span>{' '}
            Crypto.
          </Heading>
          <Text className={'mx-auto mt-12 max-w-2xl'}>
            If you are interested in making money online, then Cryptoforu is the
            right place for you. We help individuals to learn and earn crypto by
            providing them with the knowledge they need to succeed.
          </Text>
          <div className={'mt-10 flex items-center justify-center gap-x-6'}>
            <SolidButton solid={'primary'}>Get Started</SolidButton>
            <OutlineButton outline={'secondary'}>Learn More</OutlineButton>
          </div>
        </div>
      </div>
      <HeroPattern />
    </div>
  )
}
export default Hero
