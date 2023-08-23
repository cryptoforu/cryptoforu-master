import { PaginatedPosts } from '@/app/(main)/(pages)/learn-crypto/blog'
import { getBaseUrl } from '@/lib/getApiUrl'

export async function fetchCategory(
  slug: string,
  page_size: string
): Promise<PaginatedPosts> {
  const path = `${getBaseUrl()}/api/category?slug=${slug}&page_size=${page_size}`
  const res = await fetch(path)
  const { data } = await res.json()
  return data
}
