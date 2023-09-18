import { useParams } from 'next/navigation'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'

import { CategoryWithPosts } from '@/app/api/blog/blog'
import { baseCategory } from '@/app/api/blog/blogRoutes'

const f = (category: string, pageIndex: number) =>
  baseCategory({
    params: {
      category,
    },
    include: 'posts',
    page: {
      number: pageIndex.toString(),
      size: '6',
    },
  }).then((res) => res)

export default function useCategory() {
  const params = useParams()
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.data) return null
    return [params.category as string, pageIndex]
  }
  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite<
    CategoryWithPosts,
    [string, number]
  >(
    (index) => ({ index }),
    ({ index }) => f(params.category as string, index + 1),
    {
      initialSize: 1,
    }
  )

  return {
    data,
    size,
    setSize,
    isLoading,
    isValidating,
  }
}
