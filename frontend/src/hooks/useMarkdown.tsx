import { useRemarkSync, UseRemarkSyncOptions } from 'react-remark'
import rAutolinkHeadings from 'rehype-autolink-headings'
import rExternalLinks from 'rehype-external-links'
import rSlug from 'rehype-slug'
import remarkUnwrapImages from 'remark-unwrap-images'

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
