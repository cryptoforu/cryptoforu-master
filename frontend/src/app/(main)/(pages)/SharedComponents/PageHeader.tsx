'use client'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import { use } from 'react'
import { useOverlayTriggerState } from 'react-stately'

import { VideoPlayer } from '@/components/content'
import { BtnExternalLink } from '@/components/elements'
import BreadCrumbs from '@/components/elements/BreadCrumbs'
import Dialog from '@/components/overlays/Dialog'
import ModalTrigger from '@/components/overlays/ModalTrigger'
import { Heading, ProseMarkdown } from '@/components/typography'
import { Container } from '@/components/wrappers'
import { detacher } from '@/fonts/fonts'
import { filterCrumbs } from '@/lib/utils'
import { BreadcrumbsProps } from '@/types/shared-types'

function HeaderButtons({ render }: { render: boolean }) {
  const state = useOverlayTriggerState({})
  if (render) {
    return (
      <div
        className={
          'mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mt-16'
        }
      >
        <BtnExternalLink href={'https://faucetpay.io/?r=840871'}>
          Create Wallet
        </BtnExternalLink>
        <ModalTrigger
          isDismissable={true}
          label={'Watch Tutorial'}
          state={state}
          btnVariant={'outline'}
          btnColor={'secondary'}
          variant={'primary'}
          size={'xl'}
        >
          {(close) => (
            <Dialog onClose={close} className={'h-auto max-w-full'}>
              <VideoPlayer
                src={
                  'https://ik.imagekit.io/cryptoforu/Cryptoforu%20Solana(SOL)%20Crypto%20Faucet.%20Simple%20shortlink%20claim%20using%20brave%20browser_Km1q8BlGG.mp4?updatedAt=1691199716547'
                }
                poster={'/og_cryptoforu.jpg'}
              />
            </Dialog>
          )}
        </ModalTrigger>
      </div>
    )
  }
}

const PageHeader = ({ crumbs }: { crumbs: Promise<BreadcrumbsProps[]> }) => {
  const crumbsData = use(crumbs)
  const path = usePathname()
  const segments = useSelectedLayoutSegments()

  const header = filterCrumbs(crumbsData, path, segments)

  return (
    <Container className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div
        className={
          'mx-auto flex h-32 max-w-2xl flex-col justify-center gap-4 text-center'
        }
      >
        <Heading
          as={'h1'}
          size={header?.filtered ? 'lg' : 'xl'}
          variant={'gradientFrom'}
          className={`${detacher.className}`}
        >
          {header?.label}{' '}
        </Heading>

        <ProseMarkdown className={'mx-auto max-w-2xl'}>
          {header?.description}
        </ProseMarkdown>
      </div>
      {<HeaderButtons render={path.includes('faucets-list')} />}
      {header && <BreadCrumbs breadcrumbs={header} />}
    </Container>
  )
}
export default PageHeader
