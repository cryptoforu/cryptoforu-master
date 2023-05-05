import {
  createMultiStyleConfigHelpers,
  StyleFunctionProps,
} from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers([
  'editinput',
  'editfield',
  'editpreview',
  'editcontrols',
]);

export const EditInput = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    editinput: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      color: props.colorMode === 'dark' ? 'slate.400' : 'slate.600',
      fontSize: 'md',
      fontWeight: 'bold',
      alignItems: 'center',
    },
    editpreview: {
      display: 'flex',
      width: '90%',
    },
    editcontrols: {
      display: 'flex',
      flexDirection: 'row',
    },
    editfield: {
      field: {
        bg: props.colorMode === 'dark' ? 'transparent' : 'slate.800',
        color: props.colorMode === 'dark' ? 'emerald.100' : 'emerald.900',
        border: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
        fontWeight: '500',
        padding: '20px',
        borderRadius: '16px',
        _placeholder: {
          color: props.colorMode === 'dark' ? 'slate.400' : 'slate.600',
        },
        _focus: {
          borderColor: 'emerald.400',
          borderWidth: '2px',
        },
        _hover: {
          borderColor: props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
        },
      },
    },
  }),
});
