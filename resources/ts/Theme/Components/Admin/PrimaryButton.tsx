import { defineStyleConfig } from '@chakra-ui/react';

const PrimaryButton = defineStyleConfig({
  variants: {
    primary: {
      bgGradient: 'linear(to-r, teal.200, emerald.200)',
      color: 'primaryDark',
      _active: {
        bg: 'emerald.400',
      },
      _hover: {
        bgGradient: 'linear(to-l, teal.200, green.200)',
        color: 'slate.900',
      },
      _focus: {
        outline: '2.5px solid',
        outlineColor: 'emerald.500',
      },
      _dark: {
        _focus: {
          outline: '2.5px solid',
          outlineColor: 'emerald.400',
        },
      },
    },
    secondary: {
      bg: 'slate.900',
      color: 'slate.50',
      _active: {
        bg: 'slate.800',
      },
      _hover: {
        bg: 'slate.800',
        color: 'slate.100',
      },
      _focus: {
        outline: '2.5px solid',
        outlineColor: 'slate.900',
      },
      _dark: {
        _focus: {
          outline: '2.5px solid',
          outlineColor: 'slate.900',
        },
      },
    },
  },
});
export default PrimaryButton;
