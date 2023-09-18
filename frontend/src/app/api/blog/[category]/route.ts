import { NextRequest, NextResponse } from 'next/server'

import { buildRequest } from '@/app/api/apiFactory'

export async function POST(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const slug = params.category
  const p = await request.json()
  const reqParams = {
    page: {
      number: p.categoryNumber || '1',
      size: p.categorySize || '6',
    },
  }
  const response = await buildRequest({
    routeName: 'blog_category_show',
    message: 'failed',
    params: {
      category: slug,
      _query: {
        include: 'posts',
        ...reqParams,
      },
    },
    initOptions: {
      method: 'POST',
    },
  })

  return NextResponse.json(await response)
}
