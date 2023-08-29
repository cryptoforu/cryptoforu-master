'use client'
import { Suspense } from 'react'

import { TableSkeleton } from '@/components/skeletons'
import DataTable from '@/components/tables/DataTable'
import useCryptoController from '@/store/controllers/useCryptoController'
import { useTableContext } from '@/store/useDataTableStore'

const CryptoData = () => {
  const data = useCryptoController()
  const { columns } = useTableContext()

  return (
    <Suspense fallback={<TableSkeleton rows={6} />}>
      <DataTable data={data} columns={columns} />
    </Suspense>
  )
}
export default CryptoData
