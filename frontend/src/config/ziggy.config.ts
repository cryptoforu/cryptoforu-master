import fs from 'node:fs'

import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'

const data = JSON.parse(
  fs.readFileSync('src/data/ziggy.json', { encoding: 'utf8' })
)

const Routes = defineNestedType(() => ({
  name: 'Routes',
  fields: {
    uri: { type: 'string', required: true },
    methods: { type: 'list', of: { type: 'string' }, required: true },
    bindings: { type: 'json' },
  },
}))
const routeNames = {}
for (const [key] of Object.entries(data.routes)) {
  Object.assign(routeNames, {
    [key]: {
      type: 'nested',
      of: Routes,
    },
  })
}
const RouteNames = defineNestedType(() => ({
  name: 'RouteNames',
  fields: routeNames,
}))

export const Ziggy = defineDocumentType(() => ({
  name: 'Ziggy',
  filePathPattern: 'ziggy.json',
  isSingleton: true,
  fields: {
    url: { type: 'string' },
    port: { type: 'number' },
    defaults: { type: 'json' },
    routes: { type: 'nested', of: RouteNames, required: true },
  },
  contentType: 'data',
}))
