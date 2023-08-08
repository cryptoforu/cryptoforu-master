'use client'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar, ChartProps } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({
  data,
  options,
}: {
  data: ChartData<'bar'>
  options: ChartProps<'bar'>['options']
}) => {
  return (
    <div className={'rounded-xl bg-slate-50 p-4 shadow-xl dark:bg-gray-950'}>
      <Bar data={data} options={options} className={'h-auto max-w-full'} />
    </div>
  )
}
export default BarChart
