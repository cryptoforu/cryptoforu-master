import { QueryParams } from 'ziggy-js'

import { buildRequest } from '@/app/api/apiFactory'
import { CryptoCoin, PaginatedCoins } from '@/app/api/crypto/crypto'

export async function getCoins(queryParams?: QueryParams) {
  return (await buildRequest({
    routeName: 'crypto_index',
    message: 'Failed To Fetch Coins',
    params: {
      _query: queryParams,
    },
  })) as Promise<PaginatedCoins>
}

export async function getGainersLosers() {
  return (await buildRequest({
    routeName: 'crypto_gainers_losers',
    message: 'Failed To Fetch Gainers and Losers',
  })) as {
    gainers: CryptoCoin[]
    losers: CryptoCoin[]
  }
}
