'use client'
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { ChartProps, Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const RadarChart = ({ data }: { data: ChartProps<'radar'>['data'] }) => {
  return (
    <div
      className={
        'max-w-md rounded-xl bg-slate-50 p-4 shadow-xl dark:bg-gray-950'
      }
    >
      <Radar data={data} />
    </div>
  )
}
export default RadarChart
