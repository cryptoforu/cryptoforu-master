'use client'

import { useNumberFormatter } from '@react-aria/i18n'
import { parseFloatNumber } from '@/lib/utils'

interface FormatterProps extends Intl.NumberFormatOptions {
  value: number | string
}

export function Currency(props: FormatterProps) {
  const { currency, value, ...rest } = props
  let formatter = useNumberFormatter({
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    ...rest,
  })
  const formatted =
    typeof value === 'string' ? (parseFloatNumber(value) as number) : value
  return <>{formatter.format(formatted)}</>
}
