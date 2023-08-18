import { ChartData } from 'chart.js'
import { ChartProps } from 'react-chartjs-2'

import { ListStats } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

export function filterListCharts({ data }: { data: ListStats }) {
  const chartCoinData: ChartData<'bar'> = {
    labels: data.coinStats.map((val) => val.coin),
    datasets: [
      {
        label: `Total Paid ${data.totalCoin} of All Coins`,
        data: data.coinStats.map((val) => val.sum),
        backgroundColor: data.coinStats.map((val) => val.color),
        borderColor: data.coinStats.map((val) => val.color),
      },
    ],
  }
  const chartFaucetData: ChartData<'bar'> = {
    labels: data.faucetsStats.map((val) => val.coin),
    datasets: [
      {
        label: `${data.totalFaucets} Total Faucets`,
        data: data.faucetsStats.map((val) => val.faucets),
        backgroundColor: data.faucetsStats.map((val) => val.color),
      },
    ],
  }

  return {
    chartFaucetData,
    chartCoinData,
  }
}

export const chartCoinOptions = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = 'Total Paid in' + ' ' + context.label || ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
      title: {
        display: true,
        text: 'Total Payouts (24h)',
        font: {
          size: 16,
        },
      },
    },
  } as ChartProps<'bar'>['options']
}

export const chartFaucetOptions = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = 'Total' + ' ' + context.label + ' Faucets' || ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y
            }
            return label
          },
        },
      },
      title: {
        display: true,
        text: 'Total Faucets (24h)',
        font: {
          size: 16,
        },
      },
    },
  } as ChartProps<'bar'>['options']
}
