import Image from 'next/image'

import { Heading } from '@/components/typography'

interface ImageCellProps {
  image: string
  alt: string
  title?: string
}

const ImageCell = (props: ImageCellProps) => {
  return (
    <>
      <div className={'flex w-full items-center space-x-2'}>
        <Image src={props.image} alt={props.alt} width={24} height={24} />
        <Heading as={'h3'} size={'sm'} variant={'secondary'}>
          {props.title}
        </Heading>
      </div>
    </>
  )
}
export default ImageCell
