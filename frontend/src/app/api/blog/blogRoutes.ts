import { buildRequest } from '@/app/api/apiFactory'
import {
  CategoriesQuery,
  CategoryParams,
  CategoryQuery,
  CategoryWithPosts,
  GetCategoryReturnType,
  ITags,
  PostParams,
  PostQuery,
  PostWithCategory,
} from '@/app/api/blog/blog'
import { getImageUrl } from '@/lib/getApiUrl'
import seo from '@/lib/seo'

export async function getCategories(categoriesQuery: CategoriesQuery) {
  return (await buildRequest({
    routeName: 'blog:index',
    message: 'Failed To Fetch Categories',
    params: {
      _query: categoriesQuery,
    },
  })) as Promise<Array<CategoryWithPosts>>
}

export async function baseCategory<T extends CategoryQuery>(
  { params, ...query }: T,
  init?: RequestInit
): Promise<GetCategoryReturnType<T>> {
  return await buildRequest({
    routeName: 'blog:category',
    message: `Failed To Fetch ${params.category}`,
    params: {
      category: params.category,
      _query: query,
    },
    ...init,
  })
}

export async function getLatest(limit?: string) {
  return (await buildRequest({
    routeName: 'blog:latest',
    message: 'Failed To Fetch Latest Posts',
    params: {
      _query: {
        limit,
      },
    },
  })) as Promise<Array<PostWithCategory>>
}

export async function getCategoryMeta({ params }: CategoryParams) {
  const meta = await baseCategory({ params })

  if (!meta) {
    return seo
  }
  return {
    title: meta.name,
    description: meta.description,
    alternates: {
      canonical: `learn-crypto/${meta.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${process.env.HOST}/learn-crypto/${meta.slug}`,
      title: meta.name,
      description: meta.description,
      siteName: 'Cryptoforu',
      images: [`${getImageUrl()}lg/${meta.category_image}`],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@CryptoforuEarn',
      title: meta.name,
      description: meta.description,
      images: [`${getImageUrl()}lg/${meta.category_image}`],
    },
  }
}

export async function getPost({ params, ...rest }: PostQuery) {
  return (await buildRequest({
    routeName: 'blog:post',
    message: `Failed To Fetch ${params.post}`,
    params: {
      category: params.category,
      post: params.post,
      _query: rest,
    },
  })) as PostWithCategory
}

export async function getRelatedPosts(category: string, related: string) {
  return await baseCategory({
    params: {
      category,
    },
    include: 'posts',
    filter: {
      related: related,
    },
    page: {
      size: '4',
    },
  })
}

export async function getPostMeta({ params }: PostParams) {
  const meta = await getPost({ params })
  if (!meta) {
    return seo
  }
  return {
    title: meta.title,
    description: meta.introduction,
    alternates: {
      canonical: meta.post_links.post_link,
    },
    openGraph: {
      type: 'website',
      url: `${process.env.HOST}/${meta.post_links.post_link}`,
      title: meta.title,
      description: meta.introduction,
      siteName: 'Cryptoforu',
      images: [`${getImageUrl()}lg/${meta.image_name}`],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@CryptoforuEarn',
      title: meta.title,
      description: meta.introduction,
      images: [`${getImageUrl()}lg/${meta.image_name}`],
    },
  }
}

export async function getTags() {
  return (await buildRequest({
    routeName: 'blog:tags',
    message: 'Failed To Fetch Tags',
  })) as ITags[]
}
