'use client'
import { Suspense } from 'react'
import Spinner from '@/motion/Spinner'
import DataTable from '@/components/tables/DataTable'
import useCryptoController from '@/store/controllers/useCryptoController'

const CryptoData = () => {
  const { cols, data } = useCryptoController()
  return (
    <Suspense fallback={<Spinner />}>
      {/* @ts-ignore eslint-disable-next-line */}
      <DataTable data={data} columns={cols} />
    </Suspense>
  )
}
export default CryptoData
