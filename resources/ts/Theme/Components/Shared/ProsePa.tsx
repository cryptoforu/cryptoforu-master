import { defineStyleConfig, StyleFunctionProps } from '@chakra-ui/react';

import { em, rem, round } from '@/Theme/utils/convert';

const ProsePa = defineStyleConfig({
  baseStyle: {
    fontWeight: '400',
    lineHeight: round(28 / 16),
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  sizes: {
    sm: {
      fontSize: rem(14),
    },
    md: {
      fontSize: rem(16),
    },
    lg: {
      fontSize: rem(18),
    },
  },
  variants: {
    primary: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'slate.400' : 'slate.700',
    }),
    secondary: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'gray.400' : 'gray.700',
    }),
    dark: () => ({
      color: 'slate.700',
    }),
    gradEmerald: () => ({
      bgGradient: 'linear(to-r, emerald.200, green.400, teal.200)',
      bgClip: 'text',
      fontWeight: 'bold',
      letterSpacing: '-0.025em',
    }),
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});
export default ProsePa;
