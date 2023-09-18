import { buildRequest } from '@/app/api/apiFactory'
import {
  CategoriesQuery,
  CategoryParams,
  CategoryQuery,
  CategoryWithPosts,
  ITags,
  PostParams,
  PostQuery,
  PostWithCategory,
} from '@/app/api/blog/blog'
import { getImageUrl } from '@/lib/getApiUrl'
import seo from '@/lib/seo'

/**
 * Get All Blog Categories
 * With or Without Posts
 * @param categoriesQuery
 */
export async function getCategories<T>(categoriesQuery?: CategoriesQuery) {
  return (await buildRequest({
    routeName: 'blog_category_index',
    message: 'Failed To Fetch Categories',
    params: {
      _query: categoriesQuery,
    },
  })) as Promise<T>
}

/**
 * Get A Specific Category
 * With Or Without Posts
 * @param params
 * @param categoryQuery
 * @param init
 */
export async function fetchCategory<T>(
  { params, ...categoryQuery }: CategoryQuery,
  init?: RequestInit
): Promise<T> {
  return await buildRequest({
    routeName: 'blog_category_show',
    message: `Failed To Fetch ${params.category}`,
    params: {
      category: params.category,
      _query: categoryQuery,
    },
    ...init,
  })
}

/**
 * Get Latest Blog Posts
 * Updated Daily
 * @param limit
 */
export async function getLatest(limit?: string) {
  return (await buildRequest({
    routeName: 'blog_posts_latest',
    message: 'Failed To Fetch Latest Posts',
    params: {
      _query: {
        limit,
      },
    },
    initOptions: {
      next: {
        revalidate: 86400,
      },
    },
  })) as Promise<Array<PostWithCategory>>
}

/**
 * Category Page SEO
 * @param params
 */
export async function getCategoryMeta({ params }: CategoryParams) {
  const meta = await fetchCategory<CategoryWithPosts>({ params })

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

/**
 * Get A Single Post With Category
 * @param params
 * @param rest
 */
export async function getPost({ params, ...rest }: PostQuery) {
  return (await buildRequest({
    routeName: 'blog_posts_show',
    message: `Failed To Fetch ${params.post}`,
    params: {
      post: params.post,
      _query: rest,
    },
  })) as PostWithCategory
}

/**
 * Get 4 Related Posts For Rendered Post or Category
 * @param params
 */
export async function getRelatedPosts(
  params: Partial<PostParams['params']>
): Promise<PostWithCategory[]> {
  const queryParams = {
    routeName: 'blog_category_related',
    message: `Failed To Fetch Related Posts For ${params.category}`,
    params: {
      category: params.category,
    },
  }
  if (params.post !== undefined) {
    Object.assign(queryParams, {
      routeName: 'blog_posts_related',
      message: `Failed To Fetch Related Posts for ${params.post}`,
      params: {
        post: params.post,
      },
    })
  }
  return await buildRequest({
    ...queryParams,
  })
}

/**
 * Post Page SEO
 * @param params
 */
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

/**
 * Get All Blog Tags
 */
export async function getTags() {
  return (await buildRequest({
    routeName: 'blog_tags',
    message: 'Failed To Fetch Tags',
  })) as ITags[]
}
