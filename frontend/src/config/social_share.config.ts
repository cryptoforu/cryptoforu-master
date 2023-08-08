import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

export const SocialShare = defineNestedType(() => ({
  name: 'SocialShare',
  fields: {
    link: { type: 'string', required: true },
    label: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
}))

export const SocialShareData = defineDocumentType(() => ({
  name: 'SocialShareData',
  filePathPattern: 'social_share.json',
  isSingleton: true,
  fields: {
    fb: {
      type: 'nested',
      of: SocialShare,
      required: true,
    },
    tw: {
      type: 'nested',
      of: SocialShare,
      required: true,
    },
    pinterest: {
      type: 'nested',
      of: SocialShare,
      required: true,
    },
    linkedin: {
      type: 'nested',
      of: SocialShare,
      required: true,
    },
    reddit: {
      type: 'nested',
      of: SocialShare,
      required: true,
    },
  },
  contentType: 'data',
}))
