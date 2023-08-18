'use client'
import { ListStats } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import BarChart from '@/components/charts/BarChart'
import {
  chartCoinOptions,
  chartFaucetOptions,
  filterListCharts,
} from '@/components/charts/data/filterListCharts'

const ListCharts = ({ stats }: { stats: ListStats }) => {
  const { chartFaucetData, chartCoinData } = filterListCharts({ data: stats })
  const coinOptions = chartCoinOptions()
  const faucetOptions = chartFaucetOptions()

  return (
    <>
      <BarChart data={chartCoinData} options={coinOptions} />

      <BarChart data={chartFaucetData} options={faucetOptions} />
    </>
  )
}
export default ListCharts
