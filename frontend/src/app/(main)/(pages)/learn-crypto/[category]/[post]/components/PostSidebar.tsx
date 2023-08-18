import { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import Sidebar from '@/components/sidebar/Sidebar'
import SidebarProvider from '@/store/controllers/SidebarProvider'

const PostSidebar = ({ post }: { post: PostApiResource }) => {
  return (
    <SidebarProvider
      selectedType={'post'}
      data={{ id: 'Post', tagsProps: post.tags }}
    >
      <Sidebar />
    </SidebarProvider>
  )
}
export default PostSidebar
