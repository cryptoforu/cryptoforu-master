import type { ReactNode } from 'react'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className={'flex w-full flex-col'}>{children}</div>
}