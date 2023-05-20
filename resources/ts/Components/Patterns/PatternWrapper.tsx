import { PropsWithChildren } from 'react';
import { Box, BoxProps, useColorModeValue as mode } from '@chakra-ui/react';

const PatternWrapper = ({
  children,
  ...props
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      position="absolute"
      inset="0"
      p="10"
      zIndex="-10"
      mx="0"
      maxWidth="none"
      overflow="hidden"
    >
      <Box
        position="absolute"
        __css={{
          _dark: {
            maskImage: 'linear-gradient(white,transparent)',
          },
        }}
        {...props}
      >
        <Box
          position="absolute"
          top="10"
          insetX="0"
          bgGradient={mode(
            'linear(to-b, #36b49f, emerald.50)',
            'linear(to-b, emeraldAlpha.300, primaryDark)'
          )}
          opacity={mode(0.4, 1)}
          __css={{
            maskImage: 'linear-gradient(0deg,white,transparent)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default PatternWrapper;
