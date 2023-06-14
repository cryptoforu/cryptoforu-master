import { Container } from '@chakra-ui/react';

import AppHead from '@/Components/AppHead';
import { PostsTable } from '@/Components/Table';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';

const PostIndex = () => {
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Container position={'relative'} mx={'auto'} maxWidth="8xl">
          <PostsTable />
        </Container>
      </PanelWrapper>
    </>
  );
};

// eslint-disable-next-line react/no-children-prop
PostIndex.layout = (page: string) => <AdminLayout children={page} />;
export default PostIndex;
