import { makeSource } from '@contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import remarkMdxImages from 'remark-mdx-images'

import {
  BreadCrumbsData,
  Footer,
  ListData,
  ListDescription,
  Menu,
  PagesData,
  SidebarData,
  SocialShareData,
  Ziggy,
} from './src/config'

const Features = defineDocumentType(() => ({
  name: 'Features',
  filePathPattern: `features/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    link: { type: 'string', required: true },
    image: { type: 'string', required: true },
  },
}))

export default makeSource({
  disableImportAliasWarning: true,
  contentDirPath: 'src/data',
  documentTypes: [
    BreadCrumbsData,
    PagesData,
    SidebarData,
    SocialShareData,
    Footer,
    Features,
    ListData,
    ListDescription,
    Menu,
    Ziggy,
  ],
  mdx: {
    remarkPlugins: [remarkMdxImages],
  },
})
