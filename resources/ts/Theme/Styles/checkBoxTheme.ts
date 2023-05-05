import {
  createMultiStyleConfigHelpers,
  StyleFunctionProps,
} from '@chakra-ui/styled-system';
import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';

const helpers = createMultiStyleConfigHelpers(parts.keys);

export const TagsInput = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    control: {
      width: 4,
      height: 4,
      rounded: 'md',
      bg: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
      color: props.colorMode === 'dark' ? 'slate.100' : 'slate.900',
      _checked: {
        bg: props.colorMode === 'dark' ? 'emerald.400' : 'emerald.600',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      bg: props.colorMode === 'dark' ? 'transparent' : 'slate.800',
      border: '1px solid',
      borderColor: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
      borderRadius: '8px',
      p: '8px',
      cursor: 'pointer',
      _checked: {
        borderColor: props.colorMode === 'dark' ? 'emerald.500' : 'emerald.400',
      },
      _focus: {
        borderColor: props.colorMode === 'dark' ? 'emerald.500' : 'emerald.400',
      },
    },
    label: {
      color: props.colorMode === 'dark' ? 'emerald.100' : 'slate.900',
      fontSize: 'sm',
    },
  }),
});
