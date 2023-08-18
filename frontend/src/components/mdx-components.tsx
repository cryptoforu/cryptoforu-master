import type { MDXComponents } from 'mdx/types'
import { Route } from 'next'
import { ImageProps } from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ReactNode } from 'react'

import { Card, CardBody, SectionHeader } from '@/components/content'
import type { ISectionHeaderProps } from '@/components/content/SectionHeader'
import {
  ExternalLink,
  InternalLink,
  ResponsiveImage,
} from '@/components/elements'
import SectionGrid from '@/components/patterns/SectionGrid'
import { Prose } from '@/components/typography'
import type { IProseProps } from '@/components/typography/Prose'
import type {
  IContainerProps,
  IGridProps,
  ISectionProps,
} from '@/components/wrappers'
import { Container, Grid, Section } from '@/components/wrappers'
import { getBaseUrl } from '@/lib/getApiUrl'

const baseUrl = getBaseUrl()

function Link({ href, children }: { href?: string; children: ReactNode }) {
  if (href?.includes(baseUrl as string)) {
    return <InternalLink href={href as Route}>{children}</InternalLink>
  }
  return <ExternalLink href={href as string}>{children}</ExternalLink>
}

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
  Prose: (props: IProseProps) => <Prose {...props}>{props.children}</Prose>,
  Section: (props: ISectionProps) => <Section {...props} />,
  Container: (props: IContainerProps) => <Container {...props} />,
  Grid: (props: IGridProps) => <Grid {...props} />,
  SectionHeader: (props: ISectionHeaderProps) => <SectionHeader {...props} />,
  Image: (props: ImageProps) => <ResponsiveImage {...props} />,
  SectionGrid: () => <SectionGrid />,
  Card: ({ children }: { children: ReactNode }) => (
    <Card variant={'filledGray'} size={'prose'} animation={'primary'}>
      {children}
    </Card>
  ),
  CardBody: ({ children }: { children: ReactNode }) => (
    <CardBody variant={'secondary'} size={'sm'}>
      {children}
    </CardBody>
  ),
}

export default function MdxContent({ code }: { code: string }) {
  const MDX = useMDXComponent(code)
  return <MDX components={mdxComponents} />
}
