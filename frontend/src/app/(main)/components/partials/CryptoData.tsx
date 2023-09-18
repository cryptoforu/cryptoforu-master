'use client'
import { useMemo } from 'react'

import DataTable from '@/components/tables/DataTable'
import { getColumns } from '@/lib/generateColumns'
import useCryptoController from '@/store/controllers/useCryptoController'
import { CellProps } from '@/store/types/data-table-store'

const CryptoData = ({ tableColumns }: { tableColumns: CellProps[] }) => {
  const { coinsData } = useCryptoController()
  const columns = useMemo(
    () => getColumns(Object.values(tableColumns)),
    [tableColumns]
  )
  return <DataTable data={coinsData} columns={columns} />
}
export default CryptoData
