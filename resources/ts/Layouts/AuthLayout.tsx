import { Text, Stack, Heading, HStack, Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Logo } from '@/Components/Elements/Content';
import { NavLink } from '@/Components/Elements/Navigation';
import AppHead from '@/Components/AppHead';

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
      <Flex position="relative" h="max-content">
        <Flex
          h={{
            sm: 'initial',
            md: 'unset',
            lg: '100vh',
            xl: '97vh',
          }}
          w="100%"
          maxW={{ md: '66%', lg: '1313px' }}
          mx="auto"
          pt={{ sm: '16px', md: '0px' }}
          px={{ lg: '30px', xl: '0px' }}
          ps={{ xl: '70px' }}
          justifyContent="start"
          direction="column"
        >
          <Flex
            maxW={{ base: '100%', md: 'max-content' }}
            w="100%"
            mx={{ base: 'auto', lg: '0px' }}
            me="auto"
            h="100%"
            alignItems="start"
            justifyContent="center"
            mb={{ base: '30px', md: '60px' }}
            px={{ base: '25px', md: '0px' }}
            mt={{ base: '40px', md: '14vh' }}
            flexDirection="column"
          >
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
                <NavLink url={to}>{label}</NavLink>
              </HStack>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
            >
              {children}
            </Flex>
          </Flex>

          <Box
            display={{ base: 'none', md: 'block' }}
            h="100%"
            minH="100vh"
            w={{ lg: '50vw', '2xl': '44vw' }}
            position="absolute"
            right="0px"
          >
            <Stack spacing="6">
              <Box maxW={'full'} h="auto" mx={'auto'}>
                <Logo
                  objectFit="cover"
                  variant="baseLogo"
                  lazy={true}
                  alt={'Cryptoforu'}
                />
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthLayout;
