import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { getApiUrl } from '@/lib/getApiUrl'

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { category: string }
  }
) {
  const category = params.category
  const cookieStore = cookies()
  const coinSize = cookieStore.get('coinSize')?.value || '100'
  const coinNumber = cookieStore.get('coinNumber')?.value || '1'
  const paramsString = `page[size]=${coinSize}&page[number]=${coinNumber}`

  const apiPath =
    `${getApiUrl()}crypto/categories/${category}` + '?' + paramsString

  const response = await fetch(apiPath, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
    next: {
      tags: ['coinList'],
    },
  })
  if (!response.ok) {
    throw new Error('Failed To Fetch List')
  }
  return NextResponse.json(await response.json())
}
