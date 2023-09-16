import 'server-only'

import { NextRequest } from 'next/server'
import route, { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js'

import { getBaseUrl } from '@/lib/getApiUrl'

interface IApiRequest {
  url: URL | RequestInfo
  init?: RequestInit | undefined
}

interface IBuildRequest {
  routeName: string
  message: string
  params?: RouteParamsWithQueryOverload | RouteParam
  initOptions?: RequestInit
}

export async function baseRequest({ url, init }: IApiRequest) {
  const request = new NextRequest(`${getBaseUrl()}/api/${url}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
    ...init,
  })
  return fetch(request)
}

export async function getRoutes() {
  const routes = await baseRequest({
    url: 'ziggy',
  })
  return await routes.json()
}

export async function buildRequest({
  routeName,
  params,
  message,
  initOptions,
}: IBuildRequest) {
  const buildUrl = `${getBaseUrl()}${route(routeName, params)}`
  const request = new NextRequest(buildUrl, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
    ...initOptions,
  })
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error(message)
  }
  return await response.json()
}
