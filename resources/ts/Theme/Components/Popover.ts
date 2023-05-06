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
  md: definePartsStyle({
    content: {
      w: '224px',
    },
  }),
};

const main = definePartsStyle((props) => ({
  content: {
    borderRadius: '6px',
    borderColor: mode('rgb(15 23 42 / 0.1)', 'rgb(248 250 252 / 0.06)')(props),
    bg: mode('emerald.100', 'slateAlpha.900')(props),
    filter: 'primaryAlpha.700',
    backdropFilter: 'blur(8px)',
    px: 2,
    py: 2,
  },
}));

const sidebar = definePartsStyle((props) => ({
  content: {
    borderRadius: '35px',
    bg: mode('slate.100', 'slate.900')(props),
    color: mode('slate.700', 'slate.300'),
  },
}));

const variants = {
  sidebar,
  main,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
