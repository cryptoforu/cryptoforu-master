'use client'

import { useDateFormatter, useNumberFormatter } from '@react-aria/i18n'

export const DateFormatter = ({ date }: { date?: string }) => {
  let formatter = useDateFormatter()
  return (
    <>
      {date ? formatter.format(new Date(date)) : formatter.format(new Date())}
    </>
  )
}

export const NumberFormatter = (
  props: Intl.NumberFormatOptions,
  { value }: { value: number }
) => {
  let formatter = useNumberFormatter({
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: props.minimumFractionDigits,
  })
  return <>{formatter.format(value)}</>
}
