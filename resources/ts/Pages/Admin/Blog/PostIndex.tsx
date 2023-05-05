import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { Box } from '@chakra-ui/react';
import { PostsTable } from '@/Components/Table';

const PostIndex = () => {
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Box position={'relative'} mx={'auto'} maxWidth="8xl">
          <PostsTable />
        </Box>
      </PanelWrapper>
    </>
  );
};

PostIndex.layout = (page: string) => <AdminLayout children={page} />;
export default PostIndex;
