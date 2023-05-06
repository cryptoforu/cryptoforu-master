import { Box, useColorModeValue as mode } from '@chakra-ui/react';

export default function BgGlow() {
  return (
    <>
      <Box
        aria-hidden={true}
        display="flex"
        alignItems="center"
        position="absolute"
        inset={0}
        height="100%"
      >
        <Box
          aria-hidden={true}
          w={{ base: '224px', md: '30rem' }}
          h={{ base: '224px', md: '30rem' }}
          m="auto"
          blur={{ base: 'xl', md: '3xl' }}
          bgGradient="radial-gradient(to-r, green.600, emerald.400, teal.600)"
          rounded="full"
        />
      </Box>
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        bg={mode('slate.100', 'slateAlpha.900')}
        opacity={0.95}
      />
    </>
  );
}
