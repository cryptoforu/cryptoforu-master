'use client'
import {
  chartCoinOptions,
  chartFaucetOptions,
  filterListCharts,
} from '@/components/charts/data/filterListCharts'
import BarChart from '@/components/charts/BarChart'
import { ListStats } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

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