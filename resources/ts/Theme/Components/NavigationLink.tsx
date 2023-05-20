import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';
import { em } from '../utils/convert';
export const NavigationLink = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    fontWeight: 'medium',
    transition: 'all 0.15s ease-out',
    letterSpacing: '-0.025em',
  }),
  variants: {
    primary: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'slate.50' : 'slate.900',
      _hover: {
        textDecoration: 'underline',
        textColor: props.colorMode === 'dark' ? 'slate.100' : 'emerald.400',
      },
      _focus: {
        outline: 'none',
      },
    }),
    secondary: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'slate.300' : 'slate.600',
      _hover: {
        color: props.colorMode === 'dark' ? 'slate.40000' : 'slate.700',
      },
      _focus: {
        outline: 'none',
      },
    }),
    active: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'emerald.400' : 'emerald.500',
      _hover: {
        color: props.colorMode === 'dark' ? 'emerald.300' : 'emerald.400',
      },
    }),
    activeBg: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
      _hover: {
        bg: props.colorMode === 'dark' ? 'slate.800' : 'emerald.100',
        color: props.colorMode === 'dark' ? 'white' : 'slate.900',
      },
    }),
    colored: (props: StyleFunctionProps) => ({
      color:
        props.colorMode === 'dark'
          ? `${props.colorScheme}.400`
          : `${props.colorScheme}.500`,
      _hover: {
        color:
          props.colorMode === 'dark'
            ? `${props.colorScheme}.300`
            : `${props.colorScheme}.400`,
      },
    }),
    primaryNav: (props: StyleFunctionProps) => ({
      position: 'relative',
      color: props.colorMode === 'dark' ? 'slate.50' : 'slate.900',
      rounded: 'lg',
      px: 2,
      py: 3,
      display: 'flex',
      fontWeight: 'md',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    }),
    activeNav: (props: StyleFunctionProps) => ({
      position: 'relative',
      color: props.colorMode === 'dark' ? 'emerald.400' : 'emerald.500',
      rounded: 'lg',
      px: 2,
      py: 3,
      display: 'flex',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    }),
  },
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
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});

export const variants = NavigationLink.variants;
