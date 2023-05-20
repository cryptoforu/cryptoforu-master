import { Box } from '@chakra-ui/react';
import { BgGlow } from '../Patterns';
import { PropsWithChildren } from 'react';
export interface HeroProps {
  withGlow?: boolean;
}

const HeroWrapper = ({ withGlow, children }: PropsWithChildren<HeroProps>) => {
  return (
    <Box
      position="relative"
      isolation="isolate"
      overflow="hidden"
      mt={{ base: '-4.5rem', lg: '-4.75rem' }}
      pt={{ base: '4.5rem', lg: '4.75rem' }}
      pb="32"
    >
      {withGlow ? <BgGlow /> : null}
      {children}
    </Box>
  );
};
export default HeroWrapper;
