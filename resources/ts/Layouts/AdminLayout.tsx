import React from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';
import { MainSidebar } from '@/Components/Sidebar';
import { AdminNav } from '@/Components/Navbars';
import useTypedPage from '@/Hooks/useTypedPage';
import useToastStore from '@/Store/useToastStore';

import { useAdminLayoutAnimation } from '@/Store/useAdminLayout';
import { m } from 'framer-motion';
const AdminLayout = ({ children }: React.PropsWithChildren) => {
  useToastStore();
  const { url } = useTypedPage();
  const scope = useAdminLayoutAnimation();

  return (
    <>
      <Flex height="full" ref={scope}>
        <MainSidebar />
        <Box
          as="main"
          display={'flex'}
          flexDirection="column"
          minH="full"
          minW={'full'}
        >
          <AdminNav />
          <Box py="8">
            <Container
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
              as={m.div}
              key={url}
              variant="panel"
            >
              {children}
            </Container>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AdminLayout;
