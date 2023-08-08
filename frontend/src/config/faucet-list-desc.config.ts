import { defineDocumentType } from 'contentlayer/source-files'

export const ListDescription = defineDocumentType(() => ({
  name: 'ListDescription',
  filePathPattern: 'faucetslist/description.mdx',
  contentType: 'mdx',
  isSingleton: true,
  fields: {
    title: { type: 'string', required: true },
    gradTitle: { type: 'string', required: true },
    badge: { type: 'string', required: true },
  },
}))