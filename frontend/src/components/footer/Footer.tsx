import { footer } from 'contentlayer/generated'
import { Route } from 'next'

import AppLogo from '@/components/AppLogo'
import { ExternalLink, InternalLink, LazyImage } from '@/components/elements'
import { DateFormatter } from '@/components/misc/DateFormatter'

const Footer = () => {
  const { social_links, footer_nav } = footer

  return (
    <footer
      className={
        'flex w-full justify-center border-t border-slate-100 py-16 dark:border-gray-900'
      }
    >
      <div className={'md:px-12 lg:px-28'}>
        <div
          className={
            'container m-auto space-y-6 text-slate-600 dark:text-slate-300'
          }
        >
          <AppLogo className={'m-auto w-40'} />
          <ul
            className={
              'flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8'
            }
          >
            {footer_nav.map((footer) => (
              <li key={footer.id}>
                <InternalLink href={footer.href as Route} hover={'emerald'}>
                  {footer.name}
                </InternalLink>
              </li>
            ))}
          </ul>
          <div
            className={
              'm-auto flex w-max items-center justify-between space-x-4'
            }
          >
            {social_links.map((social) => (
              <ExternalLink href={social.href as string} key={social.name}>
                <LazyImage
                  src={social.image}
                  alt={social.name as string}
                  width={240}
                  height={240}
                  className={'m-auto w-5'}
                  filter={'icon'}
                />
              </ExternalLink>
            ))}
          </div>
          <div className={'text-center'}>
            <span className={'text-sm tracking-wide'}>
              Copyright &copy; Cryptoforu <DateFormatter /> | All rights
              reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
