import { ReactNode } from 'react'

export default async function BlogLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { category: string; post: string }
}) {
  return (
    <div className={'mx-auto flex max-w-none flex-col justify-center'}>
      {children}
    </div>
  )
}
