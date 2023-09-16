import { buildRequest } from '@/app/api/apiFactory'
import { BreadcrumbsProps } from '@/types/shared-types'

export async function getMetaData(page: string) {
  const meta = await buildRequest({
    routeName: 'site:meta_data',
    message: `Failed To Fetch ${page} Meta Data`,
    params: {
      _query: {
        filter: {
          page_name: page,
        },
      },
    },
  })
  return {
    title: meta.label,
    description: meta.meta_desc,
    alternates: {
      canonical: meta.route,
    },
  }
}

export async function getBreadCrumbs() {
  return (await buildRequest({
    routeName: 'site:breadcrumbs',
    message: 'Failed To Fetch BreadCrumbs',
  })) as BreadcrumbsProps[]
}

export async function getSiteData(param: string) {
  return await buildRequest({
    routeName: 'site:home',
    message: 'Failed To Fetch FaqQuestions',
    params: {
      site: param,
    },
  })
}
