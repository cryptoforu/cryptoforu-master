// noinspection JSUnusedGlobalSymbols

import { ReactNode } from 'react'

import { CategoryProps } from '@/app/(main)/(pages)/learn-crypto/blog'
import { getCategories } from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'

export async function generateStaticParams() {
  const categoryApiResources = (await getCategories()) as CategoryProps[]
  return categoryApiResources.map((c) => ({
    category: c.slug,
  }))
}

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={'mx-auto flex max-w-none flex-col justify-center'}>
      {children}
    </div>
  )
}
