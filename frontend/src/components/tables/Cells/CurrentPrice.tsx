import { Text } from '@/components/typography'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Currency } from '@/components/misc/NumberFormatter'
import { clsx } from 'clsx'
import { useDeferredValue } from 'react'

interface CurrentPriceCellProps {
  nextPrice: number
  color: string
}

const CurrentPrice = (props: CurrentPriceCellProps) => {
  let colors = useDeferredValue(props.color) as 'danger' | 'success'

  return (
    <>
      <Text
        variant={colors}
        className={clsx(
          'inline-flex items-center transition duration-500 ease-in-out'
        )}
      >
        {colors === 'danger' ? (
          <ChevronDownIcon className={'h-5 w-5'} />
        ) : (
          <ChevronUpIcon className={'h-5 w-5'} />
        )}
        <Currency value={props.nextPrice} currency={'USD'} />
      </Text>
    </>
  )
}
export default CurrentPrice
