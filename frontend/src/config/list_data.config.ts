import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

const ListTab = defineNestedType(() => ({
  name: 'ListTab',
  fields: {
    id: { type: 'string', required: true },
    label: { type: 'string', required: true },
    image: { type: 'string', required: true },
  },
}))

const PageSizeItem = defineNestedType(() => ({
  name: 'PageSizeItem',
  fields: {
    id: { type: 'number', required: true },
    size: { type: 'string', required: true },
  },
}))

export const ListData = defineDocumentType(() => ({
  name: 'ListData',
  filePathPattern: 'list_data.json',
  isSingleton: true,
  fields: {
    tabs: {
      type: 'list',
      of: ListTab,
      required: true,
    },
    page_size: {
      type: 'list',
      of: PageSizeItem,
      required: true,
    },
  },
  contentType: 'data',
}))
