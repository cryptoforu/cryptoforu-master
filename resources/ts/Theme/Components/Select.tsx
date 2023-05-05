import { selectAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { mainStyle } from '../Styles/inputStyles';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const main = definePartsStyle({
  field: {
    ...mainStyle,
  },
  icon: {
    color: 'emerald.400',
  },
});

const primary = (props: StyleFunctionProps) => {
  return definePartsStyle({
    field: {
      bg: mode('slate.800', 'transparent')(props),
      color: mode('slate.100', 'emerald.400')(props),
      border: '1px solid',
      borderColor: mode('slate.200', 'slate.800')(props),
      fontWeight: '500',
      fontSize: 'sm',
      borderRadius: '16px',
      _placeholder: {
        color: mode('slate.600', 'slate.400')(props),
      },
      _focus: {
        outlineWidth: '2px',
        outlineColor: mode('emerald.600', 'emerald.400')(props),
      },
      _hover: {
        borderColor: mode('emerald.200', 'emerald.800')(props),
      },
    },
    icon: {
      color: mode('slate.100', 'emerald.400')(props),
    },
  });
};

export const selectTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'primary',
  },
  variants: { main, primary },
});
