import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';
import { round, em, rem } from '../utils/convert';

export const ProsePa = defineStyleConfig({
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
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});
