import { Box } from '@chakra-ui/react';
import { GridPattern, BgGlow } from '../Patterns';
import { PropsWithChildren } from 'react';
export interface HeroProps {
  withGlow?: boolean;
  withGrid?: boolean;
}

const HeroWrapper = ({
  withGlow,
  withGrid,
  children,
}: PropsWithChildren<HeroProps>) => {
  return (
    <Box
      position="relative"
      isolation="isolate"
      overflow="hidden"
      mt={{ base: '-4.5rem', lg: '-4.75rem' }}
      pt={{ base: '4.5rem', lg: '4.75rem' }}
      pb="32"
      mb="-32"
    >
      {withGlow ? <BgGlow /> : null}
      {withGrid ? <GridPattern /> : null}
      {children}
    </Box>
  );
};
export default HeroWrapper;
