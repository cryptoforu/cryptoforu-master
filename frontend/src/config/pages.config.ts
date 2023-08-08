import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

export const Parents = defineNestedType(() => ({
  name: 'Parents',
  fields: {
    id: { type: 'number', required: true },
    label: { type: 'string', required: true },
    route: { type: 'string', required: true },
  },
}))
export const Crumbs = defineNestedType(() => ({
  name: 'Crumbs',
  fields: {
    id: { type: 'number', required: true },
    label: { type: 'string', required: true },
    route: { type: 'string', required: true },
    parents: {
      type: 'nested',
      of: Parents,
    },
  },
}))
export const Page = defineNestedType(() => ({
  name: 'Page',
  fields: {
    route: { type: 'string', required: true },
    label: { type: 'string', required: true },
    gradLabel: { type: 'string', required: true },
    meta_desc: { type: 'string', required: true },
  },
}))
export const BreadCrumbsData = defineDocumentType(() => ({
  name: 'BreadCrumbsData',
  filePathPattern: 'breadcrumbs.json',
  isSingleton: true,
  fields: {
    breadcrumbs: {
      type: 'list',
      of: Crumbs,
      required: true,
    },
  },
  contentType: 'data',
}))

export const PagesData = defineDocumentType(() => ({
  name: 'PagesData',
  filePathPattern: 'page_data.json',
  isSingleton: true,
  fields: {
    page: {
      type: 'list',
      of: Page,
    },
  },
  contentType: 'data',
}))