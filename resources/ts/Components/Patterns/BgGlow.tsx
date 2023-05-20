import { Box, useColorModeValue as mode } from '@chakra-ui/react';

export default function BgGlow() {
  return (
    <>
      <Box
        aria-hidden="true"
        display="flex"
        alignItems="center"
        position="absolute"
        inset={0}
        height="100%"
      >
        <Box
          aria-hidden="true"
          w={{ base: '224px', md: '30rem' }}
          h={{ base: '224px', md: '30rem' }}
          m="auto"
          filter="auto"
          blur={{ base: '24px', md: '64px' }}
          bgGradient="linear(to-b, #36b49f, emerald.50)"
          rounded="full"
        />
      </Box>
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        bg={mode('slate.100', 'primaryDark')}
        opacity={0.9}
      />
    </>
  );
}
