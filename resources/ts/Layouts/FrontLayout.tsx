import { PropsWithChildren } from 'react';
import AppHead from '@/Components/AppHead';
import { Container, Flex, FlexProps } from '@chakra-ui/react';

const FrontLayout = ({ children, ...props }: PropsWithChildren<FlexProps>) => {
  return (
    <>
      <AppHead />
      <Flex
        as="main"
        role="main"
        direction="column"
        flex="1"
        py="16"
        {...props}
      >
        <Container flex="1">{children}</Container>
      </Flex>
    </>
  );
};

export default FrontLayout;
