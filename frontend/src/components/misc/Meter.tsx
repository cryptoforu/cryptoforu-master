import {
  AriaMeterProps,
  mergeProps,
  useMeter,
  useVisuallyHidden,
} from 'react-aria'
import clsx from 'clsx'

type IMeter = {
  showValueLabel: boolean
} & AriaMeterProps

const Meter = (props: IMeter) => {
  let {
    label,
    showValueLabel = !!label,
    value,
    minValue = 0,
    maxValue = 100,
  } = props
  let { meterProps, labelProps } = useMeter(props)
  let { visuallyHiddenProps } = useVisuallyHidden()
  let barWidth: string = ''
  let color: string = ''
  if (value) {
    let percentage = (value - minValue) / (maxValue - minValue)
    barWidth = `${Math.round(percentage * 100)}%`
    color = clsx(
      value < 25 && 'bg-danger',
      value > 25 && value < 75 && 'bg-teal-600',
      value > 75 && 'bg-green-500'
    )
  }

  let merged = mergeProps(labelProps, visuallyHiddenProps)
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
          'text-blue-100 rounded-full p-0.5 text-center text-xs font-medium leading-none'
        )}
        style={{ width: barWidth }}
      >
        {<span>{meterProps['aria-valuetext']}</span>}
      </div>
    </div>
  )
}

export default Meter
