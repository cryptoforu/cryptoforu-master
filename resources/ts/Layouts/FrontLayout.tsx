import { lazy, Suspense, PropsWithChildren } from 'react';
import { InView } from 'react-intersection-observer';
import AppHead from '@/Components/AppHead';
import { Flex, Skeleton } from '@chakra-ui/react';
import { MainNav } from '@/Components/Navbars';

const Footer = lazy(() => import('@/Components/Footer/Footer'));

const FrontLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppHead />
      <MainNav />
      <Flex
        as="main"
        role="main"
        direction="column"
        maxWidth="full"
        position="relative"
      >
        {children}
      </Flex>
      <InView as="div">
        <Suspense fallback={<Skeleton height="300px" />}>
          <Footer />
        </Suspense>
      </InView>
    </>
  );
};

export default FrontLayout;
