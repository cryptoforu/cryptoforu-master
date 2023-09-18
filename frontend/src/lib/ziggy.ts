import { ziggy } from 'contentlayer/generated'
import { Config, Route } from 'ziggy-js'

import { removeKeysFromObject } from '@/lib/filterArray'

const routeNames = removeKeysFromObject(ziggy.routes, [
  '_id',
  '_raw',
  'type',
]) as Record<string, Route>[]

for (const [key, value] of Object.entries(routeNames)) {
  const newObj = removeKeysFromObject(value, ['_id', '_raw', 'type'])
  Object.assign(routeNames, {
    [key]: newObj,
  })
}

export const Ziggy: Config = {
  url: ziggy.url,
  port: ziggy.port,
  defaults: ziggy.defaults,
  routes: routeNames as unknown as Record<string, Route>,
}
