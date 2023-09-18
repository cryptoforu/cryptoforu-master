import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'

import { CategoryWithPosts } from '@/app/api/blog/blog'
import { fetchCategory } from '@/app/api/blog/blogRoutes'

const f = (category: string, pageIndex: number) =>
  fetchCategory<CategoryWithPosts>({
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
