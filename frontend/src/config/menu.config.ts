import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

const SubMenu = defineNestedType(() => ({
  name: 'SubMenu',
  fields: {
    id: { type: 'number', required: true },
    label: { type: 'string', required: true },
    route: { type: 'string', required: true },
  },
}))
const MenuItems = defineNestedType(() => ({
  name: 'MenuItems',
  fields: {
    id: { type: 'number', required: true },
    label: { type: 'string', required: true },
    route: { type: 'string', required: true },
    childs: {
      type: 'list',
      of: SubMenu,
    },
  },
}))
export const Menu = defineDocumentType(() => ({
  name: 'Menu',
  filePathPattern: 'menu.json',
  isSingleton: true,
  fields: {
    menu: {
      type: 'list',
      of: MenuItems,
      required: true,
    },
  },
  contentType: 'data',
}))
