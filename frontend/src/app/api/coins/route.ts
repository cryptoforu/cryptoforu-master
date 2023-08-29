import { NextRequest, NextResponse } from 'next/server'

import { getApiUrl } from '@/lib/getApiUrl'

// noinspection JSUnusedGlobalSymbols
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let path = `crypto`
  if (searchParams) {
    path = 'crypto' + '?' + searchParams.toString()
  }
  const res = await fetch(`${getApiUrl()}${path}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
  })

  if (!res.ok) {
    throw new Error('Failed to Fetch Data')
  }
  const data = await res.json()

  return NextResponse.json(data)
}
