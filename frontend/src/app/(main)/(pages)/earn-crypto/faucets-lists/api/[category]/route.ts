import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { getApiUrl } from '@/lib/getApiUrl'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category
  const cookieStore = cookies()
  const listSize = cookieStore.get('listSize')?.value || '50'
  const pageNumber = cookieStore.get('pageNumber')?.value || '1'
  const paramsString = `page[size]=${listSize}&page[number]=${pageNumber}`

  const apiPath =
    `${getApiUrl()}faucetpay/list/categories/${category}` + '?' + paramsString

  const response = await fetch(apiPath, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
    next: {
      tags: ['faucetList'],
    },
  })
  if (!response.ok) {
    throw new Error('Failed To Fetch List')
  }
  return NextResponse.json(await response.json())
}
