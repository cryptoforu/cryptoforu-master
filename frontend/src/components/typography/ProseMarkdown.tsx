import { useRemarkSync, UseRemarkSyncOptions } from 'react-remark'
import rExternalLinks from 'rehype-external-links'
import rSlug from 'rehype-slug'

import type { IProseProps } from '@/components/typography/Prose'

import { Prose } from './'

const MarkDown = ({ children, ...props }: IProseProps) => {
  const markdown = useRemarkSync(children as string, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    rehypePlugins: [
      rSlug,
      [rExternalLinks, { rel: ['nofollow'], target: ['_blank'] }],
    ] as UseRemarkSyncOptions['rehypePlugins'],
  })
  return <Prose {...props}>{markdown}</Prose>
}

export default MarkDown
