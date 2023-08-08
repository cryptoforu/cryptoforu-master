import { CurrencyState } from '@/store/useListStore'
import { cache } from 'react'
import { FaucetListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import { getBaseUrl } from '@/lib/getApiUrl'

export const fetchList = cache(
  async (
    currency: CurrencyState,
    page_size: string,
    page: string
  ): Promise<FaucetListData> => {
    const path = `${getBaseUrl()}/api/list?currency=${currency}&page_size=${page_size}&page=${page}`
    const res = await fetch(path, { cache: 'no-store' })
    const { data } = await res.json()
    return data
  }
)
