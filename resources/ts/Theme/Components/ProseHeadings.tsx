import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';
import { round, em, rem } from '../utils/convert';

export const ProseHeadings = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    fontWeight: 'bold',
    color: props.colorMode === 'dark' ? 'slate.50' : 'slate.950',
  }),
  sizes: {
    sm: {
      fontSize: em(18, 16),
    },
    md: {
      fontSize: em(20, 16),
    },
    lg: {
      fontSize: em(24, 16),
    },
    xl: {
      fontSize: em(36, 16),
    },
    xxl: {
      fontSize: em(42, 16),
      letterSpacing: '-0.025em',
    },
    xxxl: {
      fontSize: rem(56),
      lineHeight: '2.5rem',
    },
  },
  variants: {
    proseSlate: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'slate.50' : 'slate.900',
      lineHeight: round(40 / 36),
    }),
    proseSlateLight: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'slate.300' : 'slate.700',
      lineHeight: round(40 / 36),
    }),
    proseGray: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'gray.50' : 'gray.900',
      lineHeight: round(40 / 36),
    }),
    proseEmerald: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'emerald.400' : 'emerald.600',
      lineHeight: round(40 / 36),
    }),
    proseGradientEmerald: (props: StyleFunctionProps) => ({
      bgGradient: 'linear(to-r, emerald.200, green.400, teal.200)',
      bgClip: 'text',
      fontWeight: 'bold',
      letterSpacing: '-0.025em',
    }),
  },
  defaultProps: {
    variant: 'proseSlate',
  },
});
