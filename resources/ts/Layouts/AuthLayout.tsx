import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

import AppHead from '@/Components/AppHead';
import { Logo } from '@/Components/Elements/Content';
import { NavigationLink } from '@/Components/Elements/Navigation';

interface Props {
  title?: string;
  desc?: string;
  to: string;
  label?: string;
}

const AuthLayout = ({
  children,
  title,
  desc,
  to,
  label,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <AppHead />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Flex flexDirection="column">
            <Box me="auto">
              <Heading fontSize="36px" mb="10px">
                {title}
              </Heading>
              <HStack
                spacing="1"
                mb="36px"
                ms="4px"
                fontWeight="400"
                fontSize="md"
              >
                <Text>{desc}</Text>
                <NavigationLink to={to}>{label}</NavigationLink>
              </HStack>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              bg={'transparent'}
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} justify={'center'} align={'center'}>
          <Stack w={'full'} maxW={'2xl'}>
            <Logo objectFit="cover" variant="baseLogo" />
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default AuthLayout;
