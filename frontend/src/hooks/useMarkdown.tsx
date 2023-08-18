import { useRemarkSync, UseRemarkSyncOptions } from 'react-remark'
import rAutolinkHeadings from 'rehype-autolink-headings'
import rExternalLinks from 'rehype-external-links'
import rSlug from 'rehype-slug'
import remarkUnwrapImages from 'remark-unwrap-images'

const autoLinkOptions = {
  properties: {
    className:
      'absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100',
    ariaLabel: 'Anchor',
  },
}
const useMarkDown = (
  markdown: string,
  options?: UseRemarkSyncOptions['rehypeReactOptions']
) => {
  return useRemarkSync(markdown, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    remarkPlugins: [
      remarkUnwrapImages,
    ] as UseRemarkSyncOptions['remarkPlugins'],
    rehypePlugins: [
      rSlug,
      [rExternalLinks, { rel: ['nofollow'], target: ['_blank'] }],
      rAutolinkHeadings,
    ] as UseRemarkSyncOptions['rehypePlugins'],
    rehypeReactOptions: options,
  })
}

export default useMarkDown
