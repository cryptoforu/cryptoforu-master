'use client'

import { useCoinContext } from '@/store/useCoinsStore'
import CryptoTable from '@/components/tables/crypto/CryptoTable'

const TopCoins = () => {
  const coins = useCoinContext((state) => state.data)

  return (
    <div
      className={
        'w-[48rem] max-w-none rounded-xl p-8 shadow-xl ring-1 ring-slate-400/10 sm:w-[57rem]'
      }
    >
      <CryptoTable rows={coins} />
    </div>
  )
}
export default TopCoins
