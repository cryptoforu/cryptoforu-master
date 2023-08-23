import { CategoryNav, Toc } from './'

const PostLeftSidebar = () => {
  return (
    <div className="hidden lg:relative lg:block lg:w-full lg:max-w-fit lg:flex-initial lg:basis-1/4">
      <div className="sticky top-[4.9rem] -ml-0.5 h-[calc(100vh-4.9rem)] overflow-y-auto overflow-x-hidden py-8 pl-4">
        <div className="absolute bottom-0 right-0 top-8 hidden w-px bg-slate-800 dark:block" />
        <Toc />
        <CategoryNav />
      </div>
    </div>
  )
}
export default PostLeftSidebar
