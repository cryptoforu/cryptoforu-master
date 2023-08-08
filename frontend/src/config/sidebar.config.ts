import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

const SidebarNested = defineNestedType(() => ({
  name: 'SidebarNested',
  fields: {
    label: { type: 'string', required: true },
    side_type: { type: 'string', required: true },
    component: { type: 'string', required: true },
  },
}))
export const SidebarData = defineDocumentType(() => ({
  name: 'SidebarData',
  filePathPattern: 'sidebar_data.json',
  isSingleton: true,
  fields: {
    category_page: {
      type: 'list',
      of: SidebarNested,
    },
    post: {
      type: 'list',
      of: SidebarNested,
    },
  },
  contentType: 'data',
}))