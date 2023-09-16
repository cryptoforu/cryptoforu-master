'use client'
import { Suspense } from 'react'

import { TableSkeleton } from '@/components/skeletons'
import DataTable from '@/components/tables/DataTable'
import useCryptoController from '@/store/controllers/useCryptoController'
import { useCryptoContext } from '@/store/useCrypto'

const CryptoData = () => {
  const { coinsData } = useCryptoController()
  const columns = useCryptoContext((state) => state.columns)
  return (
    <Suspense fallback={<TableSkeleton rows={6} />}>
      <DataTable data={coinsData} columns={columns} />
    </Suspense>
  )
}
export default CryptoData
