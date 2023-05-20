import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('slate.950', 'emerald.100')(props),
      bg: mode('emerald.50', 'primaryDark')(props),
      display: 'flex',
      flexDirection: 'column',
      height: 'full',
      overflowX: 'hidden',
    },
    '::-webkit-scrollbar': {
      width: '5px',
    },
    '::-webkit-scrollbar-track': {
      bg: mode('slate.200', 'slate.900')(props),
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'emerald.500',
    },
    '::-webkit-scrollbar-thumb': {
      bgImage: '-webkit-linear-gradient(45deg, #6366f1, #22d3ee)',
    },
  }),
};
