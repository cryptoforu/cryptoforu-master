import { cache } from 'react'
import { fetchData } from '@/lib/fetchClient'
import 'server-only'
import { ListStats } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

export const getStats = cache(async () => {
  const res = await fetchData('faucetpay/stats')
  if (!res.ok) {
    throw new Error('Failed To Fetch Data')
  }
  return (await res.json()) as ListStats
})