import {
  createMultiStyleConfigHelpers,
  StyleFunctionProps,
} from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers([
  'container',
  'body',
  'header',
  'rowbody',
  'row',
]);

const SettingsContent = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      width: '100%',
      maxWidth: '8xl',
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      display: 'flex',
      width: '100%',
    },
    header: {
      px: '5',
      py: '4',
      fontSize: '18px',
    },
    rowbody: {
      p: '4',
      rounded: 'lg',
    },
    row: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      justifyContent: 'start',
      mb: '2',
      borderBottom: '1px',
      py: '2',
      _last: {
        borderBottom: 'none',
      },
    },
  },
  variants: {
    main: (props: StyleFunctionProps) => ({
      container: {
        padding: '22px',
      },
      body: {
        padding: '4',
        my: '4',
        flexDirection: 'column',
        gap: '4',
      },
      header: {
        bg: props.colorMode === 'dark' ? 'blackAlpha.600' : 'blackAlpha.300',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        rounded: 'lg',
      },
      rowbody: {
        bg: props.colorMode === 'dark' ? 'slate.950' : 'slate.200',
      },
      row: {
        color: props.colorMode === 'dark' ? 'slate.100' : 'slate.800',
        borderBottomColor:
          props.colorMode === 'dark' ? 'slate.800' : 'slate.100',
      },
    }),
  },
  defaultProps: {
    variant: 'main',
  },
});
export default SettingsContent;
