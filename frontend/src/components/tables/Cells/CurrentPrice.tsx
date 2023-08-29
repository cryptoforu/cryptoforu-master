import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { useState } from 'react'

import { Currency } from '@/components/misc/NumberFormatter'
import { Text } from '@/components/typography'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import usePrev from '@/hooks/usePrev'

interface CurrentPriceCellProps {
  nextPrice: number | string
}

const CurrentPrice = (props: CurrentPriceCellProps) => {
  const [currentColor, setCurrentColor] = useState<
    'primary' | 'danger' | 'success'
  >('primary')
  const prev = usePrev(props.nextPrice) as number
  useIsomorphicLayoutEffect(() => {
    if (typeof props.nextPrice === 'number') {
      setCurrentColor(prev > props.nextPrice ? 'danger' : 'success')
    }
  }, [props.nextPrice])
  const priceVariant = props.nextPrice.toString().startsWith('-')
    ? 'danger'
    : 'success'
  return typeof props.nextPrice === 'number' ? (
    <Text
      variant={currentColor}
      className={clsx(
        'inline-flex items-center transition-colors duration-500 ease-in-out'
      )}
    >
      {currentColor === 'danger' ? (
        <ChevronDownIcon className={'h-5 w-5'} />
      ) : (
        <ChevronUpIcon className={'h-5 w-5'} />
      )}
      <Currency value={props.nextPrice} currency={'USD'} />
    </Text>
  ) : (
    <Text variant={priceVariant} className={'lining-nums'} size={'md'}>
      {props.nextPrice}
    </Text>
  )
}
export default CurrentPrice
