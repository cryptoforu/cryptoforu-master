import { Cell, CellProps } from 'react-aria-components'
import Image from 'next/image'
import { Heading } from '@/components/typography'

interface ImageCellProps extends CellProps {
  image: string
  alt: string
  title?: string
}

const ImageCell = (props: ImageCellProps) => {
  return (
    <Cell textValue={props.textValue} id={props.id} className={'p-4'}>
      <div className={'flex items-center space-x-2'}>
        <Image src={props.image} alt={props.alt} width={24} height={24} />
        <Heading as={'h3'} size={'sm'} variant={'secondary'}>
          {props.children}
        </Heading>
      </div>
    </Cell>
  )
}
export default ImageCell
