import { Box, Container, Flex } from '@chakra-ui/react';
import { m } from 'framer-motion';
import React from 'react';

import { AdminNav } from '@/Components/Navbars';
import { MainSidebar } from '@/Components/Sidebar';
import useTypedPage from '@/Hooks/useTypedPage';
import { useMenuAnimation, useWidthState } from '@/Store/useAdminLayout';
import { useToast } from '@/Store/useToastProvider';

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  useToast();
  const { url } = useTypedPage();
  const isOpen = useWidthState();
  const scope = useMenuAnimation(isOpen);
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
              minW="full"
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
