import { buildRequest } from '@/app/api/apiFactory'
import { EarnCategoryProps } from '@/app/api/earning-methods/earning-methods'

export async function getEarnCategories() {
  return (await buildRequest({
    routeName: 'earn:earn_categories',
    message: 'Failed To Fetch Earn Categories',
    params: {
      include: 'earn',
    },
  })) as EarnCategoryProps[]
}
