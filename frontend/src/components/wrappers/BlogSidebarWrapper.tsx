import { ReactNode } from 'react'

const BlogSidebarWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={'flex flex-col lg:flex-row'}>{children}</div>
}
export default BlogSidebarWrapper

export const WrapperMain = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'min-w-0 max-w-2xl grow p-4 lg:max-w-none lg:px-8'}>
      {children}
    </div>
  )
}

export const WrapperSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-auto xl:justify-end xl:overflow-y-auto xl:py-16'
      }
    >
      {children}
    </div>
  )
}
