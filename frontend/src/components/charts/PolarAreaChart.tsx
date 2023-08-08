'use client'
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const PolarAreaChart = ({
  data,
  title,
}: {
  data: ChartData<'polarArea'>
  title: string
}) => {
  const options = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div
      className={
        'max-w-md rounded-xl bg-slate-50 p-4 shadow-xl dark:bg-gray-950'
      }
    >
      <PolarArea data={data} options={options} />
    </div>
  )
}
export default PolarAreaChart
