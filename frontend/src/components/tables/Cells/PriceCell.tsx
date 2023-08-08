import { Text } from '@/components/typography'

interface PriceCellProps {
  price: string
}

const PriceCell = (props: PriceCellProps) => {
  return (
    <>
      <Text
        variant={props.price?.startsWith('-') ? 'danger' : 'success'}
        className={'lining-nums'}
        size={'md'}
      >
        {props.price}
      </Text>
    </>
  )
}
export default PriceCell
