import { PostWithCategory } from '@/app/api/blog/blog'
import Sidebar from '@/components/sidebar/Sidebar'
import SidebarProvider from '@/store/controllers/SidebarProvider'

const PostSidebar = ({ post }: { post: PostWithCategory }) => {
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
