import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';

export const MainNav = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 50,
    borderBottom: '1px',
    borderBottomColor:
      props.colorMode === 'light'
        ? 'rgb(15 23 42 / 0.1)'
        : 'rgb(248 250 252 / 0.06)',
    transition: 'colors 0.5s',
  }),
  variants: {
    scrolled: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'light' ? 'whiteAlpha.900' : 'primaryAlpha.950',
      filter: 'primaryAlpha.600',
      backdropBlur: 'blur(8px)',
    }),
    notScrolled: {
      bg: 'transparent',
    },
  },
});
