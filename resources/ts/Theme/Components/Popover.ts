import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  content: {
    boxShadow: 'lg',
    w: '330px',
  },
  header: {
    pb: 0,
    borderBottomWidth: '1px',
    borderBottomColor: mode('slate.200', 'slate.500')(props),
  },
  body: {
    p: 0,
  },
}));

const sizes = {
  xl: definePartsStyle({
    content: {
      w: '400px',
    },
  }),
};

const sidebar = definePartsStyle((props) => ({
  content: {
    borderRadius: '35px',
    bg: mode('slate.100', 'slate.900')(props),
    color: mode('slate.700', 'slate.300'),
  },
}));

const variants = {
  sidebar,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
