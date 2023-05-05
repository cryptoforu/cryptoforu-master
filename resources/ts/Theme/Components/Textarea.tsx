import {
  defineStyle,
  defineStyleConfig,
  StyleFunctionProps,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { mainStyle } from '../Styles/inputStyles';
const main = defineStyle({
  ...mainStyle,
});
const primary = (props: StyleFunctionProps) => {
  return defineStyle({
    bg: mode('slate.800', 'transparent')(props),
    color: mode('emerald.900', 'emerald.100')(props),
    border: '1px solid',
    borderColor: mode('slate.200', 'slate.800')(props),
    fontWeight: '500',
    padding: '20px',
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
  });
};
export const textareaTheme = defineStyleConfig({
  defaultProps: {
    variant: 'primary',
  },
  variants: { main, primary },
});
