import { CategoryParams } from '@/app/api/blog/blog'
import { getBaseUrl } from '@/lib/getApiUrl'

export async function updateSize({ params }: CategoryParams, pageSize: string) {
  const reqPath = `${getBaseUrl()}/api/blog/${params.category}`
  const body = {
    categorySize: pageSize,
  }
  return await fetch(reqPath, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => res.json())
}
