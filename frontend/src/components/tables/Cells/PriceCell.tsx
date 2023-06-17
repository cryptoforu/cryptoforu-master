import { Cell, CellProps } from 'react-aria-components'
import { Text } from '@/components/typography'

interface PriceCellProps extends CellProps {
  price: string
}

const PriceCell = (props: PriceCellProps) => {
  return (
    <Cell textValue={props.textValue} id={props.id} className={'px-4 py-3'}>
      <Text
        variant={props.price?.startsWith('-') ? 'danger' : 'success'}
        className={'lining-nums'}
        size={'md'}
      >
        {props.children}
      </Text>
    </Cell>
  )
}
export default PriceCell
