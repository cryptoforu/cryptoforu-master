// noinspection JSUnusedGlobalSymbols

import { ReactNode } from 'react'

import { getCategories } from '@/app/api/blog/blogRoutes'

export async function generateStaticParams() {
  const categoryApiResources = await getCategories()
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
