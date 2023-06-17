import { Cell, CellProps } from 'react-aria-components'
import { Text } from '@/components/typography'

const TextCell = (props: CellProps) => {
  return (
    <Cell textValue={props.textValue} id={props.id} className={'px-4 py-3'}>
      <Text variant={'number'} size={'md'}>
        {props.children}
      </Text>
    </Cell>
  )
}
export default TextCell