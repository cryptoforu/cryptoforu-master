import { buildRequest } from '@/app/api/apiFactory'

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
