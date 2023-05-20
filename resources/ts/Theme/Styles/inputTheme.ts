import { inputAnatomy } from '@chakra-ui/anatomy';
import { mode } from '@chakra-ui/theme-tools';
import {
  createMultiStyleConfigHelpers,
  StyleFunctionProps,
} from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

export const inputTheme = defineMultiStyleConfig({
  variants: {
    main: (props: StyleFunctionProps) => ({
      field: {
        bg: mode('slate.100', 'slate.900')(props),
        color: mode('slate.950', 'emerald.200')(props),
        border: '1px solid',
        borderColor: mode('slate.50', 'slate.800')(props),
        borderRadius: '12px',
        fontSize: 'sm',
        _placeholder: { color: 'slate.600' },
        _focus: {
          outlineWidth: '2px',
          outlineColor: mode('emerald.600', 'emerald.400')(props),
        },
      },
    }),
    auth: (props: StyleFunctionProps) => ({
      field: {
        fontWeight: '500',
        color: mode('slate.700', 'slate.100')(props),
        bg: mode('transparent', 'transparent')(props),
        border: '1px solid',
        borderColor: mode('slate.100', 'rgba(135, 140, 189, 0.3)')(props),
        borderRadius: 'lg',
        _placeholder: { color: 'slate.600', fontWeight: '400' },
        _focus: {
          borderColor: 'emerald.500',
        },
      },
    }),
    primary: (props: StyleFunctionProps) => ({
      field: {
        bg: props.colorMode === 'dark' ? 'transparent' : 'slate.800',
        color: props.colorMode === 'dark' ? 'emerald.100' : 'emerald.900',
        border: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
        fontWeight: '500',
        borderRadius: '16px',
        _placeholder: {
          color: props.colorMode === 'dark' ? 'slate.400' : 'slate.600',
        },
        _focus: {
          outlineWidth: '2px',
          outlineColor: mode('emerald.600', 'emerald.400')(props),
        },
        _hover: {
          borderColor: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
        },
      },
    }),
  },
  defaultProps: {
    variant: 'primary',
  },
});
