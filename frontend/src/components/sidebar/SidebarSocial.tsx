'use client'
import { IconButton } from '@/components/elements'
import { Card, CardBody, CardHeader } from '@/components/content'
import useSocialShare from '@/hooks/useSocialShare'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline/index.js'
import { useIsSSR } from '@react-aria/ssr'
import { useCopyToClipboard } from '@/hooks/useCopy'
import { Heading } from '@/components/typography'

export default function SidebarSocial() {
  const social_media = useSocialShare(['fb', 'tw'])
  let isSSR = useIsSSR()
  let urlToCopy = isSSR ? '' : window.location.href
  const [value, copy, status] = useCopyToClipboard()
  return (
    <Card className={'order-first'}>
      <CardHeader>
        <Heading as={'h3'} size={'sm'} variant={'secondary'} className={'grow'}>
          Share on Social Media
        </Heading>
      </CardHeader>
      <CardBody className={'mt-4 flex flex-wrap justify-center gap-4'}>
        {social_media.map(
          (media) =>
            media && (
              <IconButton
                key={media.icon}
                label={media.label}
                src={media.image}
                alt={media.label}
                onClick={() => window.open(`${media.link}${urlToCopy}`)}
                colorScheme={`${media.icon as 'tw' | 'fb'}`}
              />
            )
        )}
        <IconButton
          label={status ? '!Copied' : 'Share Link'}
          variant={'solid'}
          colorScheme={'secondary'}
          as={ClipboardDocumentIcon}
          onClick={() => copy(urlToCopy)}
        />
      </CardBody>
    </Card>
  )
}
