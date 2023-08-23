import {
  AnchorHeading,
  AnchorLink,
  ResponsiveImage,
} from '@/components/elements'
import { Heading } from '@/components/typography'

export const markdownComponents = {
  a: (props: any) => <AnchorLink {...props} />,
  img: (props: any) => <ResponsiveImage src={props.src} alt={props.alt} />,
  h1: (props: any) => <Heading as={'h1'} size={'xl'} {...props} />,
  h2: (props) => (
    <AnchorHeading as={'h2'} size={'lg'} className={'group flex'} {...props} />
  ),
  h3: (props: any) => (
    <AnchorHeading as={'h3'} size={'md'} className={'group flex'} {...props} />
  ),
}
