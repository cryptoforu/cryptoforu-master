import { NextResponse } from 'next/server'

import { getApiUrl } from '@/lib/getApiUrl'

// noinspection JSUnusedGlobalSymbols
export async function GET() {
  const res = await fetch(`${getApiUrl()}site/shared/front-menu`, {
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
