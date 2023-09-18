import { NextRequest } from 'next/server'
import route, { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js'

import { getBackEndHost } from '@/lib/getApiUrl'
import { Ziggy } from '@/lib/ziggy'

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.adminToken}`,
}

const DEFAULT_OPTIONS: Pick<RequestInit, 'credentials' | 'mode'> = {
  credentials: 'include',
  mode: 'cors',
}

interface IBuildRequest {
  routeName: string
  message: string
  params?: RouteParamsWithQueryOverload | RouteParam
  initOptions?: RequestInit
}

/**
 * Build Base Request For Communication With Backend
 * Using Laravel Ziggy Routes
 * @param routeName
 * @param params
 * @param message
 * @param initOptions
 * @type IBuildRequest
 */
export async function buildRequest({
  routeName,
  params,
  message,
  initOptions,
}: IBuildRequest) {
  const headers = new Headers(DEFAULT_HEADERS)
  const options = {
    ...DEFAULT_OPTIONS,
    ...initOptions,
  }
  if (options && options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headers.append(key, value)
    }
  }
  const buildUrl = `${getBackEndHost()}${route(
    routeName,
    params,
    undefined,
    Ziggy
  )}`
  const request = new NextRequest(buildUrl, {
    ...options,
    headers,
  })
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error(message)
  }
  return await response.json()
}
