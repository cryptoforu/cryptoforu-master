import { defineDocumentType } from 'contentlayer/source-files'
import { makeSource } from '@contentlayer/source-files'
import remarkMdxImages from 'remark-mdx-images'
import {
  BreadCrumbsData,
  Footer,
  ListData,
  ListDescription,
  PagesData,
  SidebarData,
  SocialShareData,
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
  ],
  mdx: {
    remarkPlugins: [remarkMdxImages],
  },
})
