'use client'
import clsx from 'clsx'
import {
  AriaMeterProps,
  mergeProps,
  useMeter,
  useVisuallyHidden,
} from 'react-aria'

type IMeter = {
  showValueLabel: boolean
} & AriaMeterProps

const Meter = (props: IMeter) => {
  const { label, value, minValue = 0, maxValue = 100 } = props
  const { meterProps, labelProps } = useMeter(props)
  const { visuallyHiddenProps } = useVisuallyHidden()
  let barWidth = ''
  let color = ''
  if (value) {
    const percentage = (value - minValue) / (maxValue - minValue)
    barWidth = `${Math.round(percentage * 100)}%`
    color = clsx(
      value < 25 && 'bg-danger',
      value > 25 && value < 75 && 'bg-teal-600',
      value > 75 && 'bg-green-500'
    )
  }

  const merged = mergeProps(labelProps, visuallyHiddenProps)
  return (
    <div
      {...meterProps}
      className="w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
    >
      <span {...merged}>{label}</span>
      <div
        aria-label="meter"
        className={clsx(
          color,
          'rounded-full p-0.5 text-center text-xs font-medium leading-none text-cyan-100'
        )}
        style={{ width: barWidth }}
      >
        {<span>{meterProps['aria-valuetext']}</span>}
      </div>
    </div>
  )
}

export default Meter
