import { Cell, CellProps } from 'react-aria-components'
import { parseFloatNumber } from '@/lib/utils'
import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import usePrev from '@/hooks/usePrev'
import { Text } from '@/components/typography'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Currency } from '@/components/misc/NumberFormatter'

interface CurrentPriceCellProps extends CellProps {
  nextPrice: string
}

function useColorAnimation(price: number, prev: number | undefined) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (prev && scope.current) {
      animate(
        scope.current,
        { color: prev > price ? '#e11d48' : '#22c55e' },
        { duration: 1 }
      )
    }
  }, [animate, prev, price, scope])
  return scope
}

const CurrentPrice = (props: CurrentPriceCellProps) => {
  const current = parseFloatNumber(props.nextPrice) as number
  const prev = usePrev(current)
  const scope = useColorAnimation(current, prev)
  return (
    <Cell textValue={props.nextPrice} id={props.id} className={'px-4 py-3'}>
      <Text
        ref={scope}
        variant={'number'}
        className={'inline-flex items-center'}
      >
        {prev && prev > current ? (
          <ChevronDownIcon className={'h-5 w-5'} />
        ) : (
          <ChevronUpIcon className={'h-5 w-5'} />
        )}
        <Currency value={props.children as string} currency={'USD'} />
      </Text>
    </Cell>
  )
}
export default CurrentPrice
