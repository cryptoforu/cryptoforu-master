import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

const SocialLinks = defineNestedType(() => ({
  name: 'SocialLinks',
  fields: {
    name: { type: 'string', required: true },
    href: { type: 'string', required: true },
    image: { type: 'string', required: true },
  },
}))
const FooterLinks = defineNestedType(() => ({
  name: 'FooterLinks',
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    href: { type: 'string', required: true },
  },
}))

export const Footer = defineDocumentType(() => ({
  name: 'Footer',
  filePathPattern: 'footer.json',
  isSingleton: true,
  fields: {
    footer_nav: {
      type: 'list',
      of: FooterLinks,
      required: true,
    },
    social_links: {
      type: 'list',
      of: SocialLinks,
      required: true,
    },
  },
  contentType: 'data',
}))