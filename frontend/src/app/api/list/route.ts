import { NextRequest, NextResponse } from 'next/server'

import { getApiUrl } from '@/lib/getApiUrl'

// noinspection JSUnusedGlobalSymbols
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const currency = searchParams.get('currency')
  const page_size = searchParams.get('page_size')
  const page = searchParams.get('page')
  const path = `faucetpay/list?filter[currency]=${currency}&page_size=${page_size}&page=${page}`
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

  return NextResponse.json({ data })
}
