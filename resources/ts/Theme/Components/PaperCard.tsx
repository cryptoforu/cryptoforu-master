import {
  createMultiStyleConfigHelpers,
  StyleFunctionProps,
} from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers([
  'pcard',
  'pimage',
  'pbody',
  'pfooter',
]);

const PaperCard = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    pcard: {
      rounded: 'md',
      my: 5,
      mx: [0, 5],
      overflow: 'hidden',
    },
    pimage: {
      borderBottom: '1px solid',
    },
    pbody: {
      p: '4',
    },
    pfooter: {
      borderTop: '1px solid',
    },
  }),
  sizes: {
    sm: {
      pcard: {
        maxWidth: 'sm',
      },
      pimage: {
        maxHeight: '200px',
      },
      pbody: {
        textAlign: 'start',
      },
      pfooter: {
        p: '0',
      },
    },
  },
  variants: {
    primary: (props: StyleFunctionProps) => ({
      pcard: {
        bg: props.colorMode === 'dark' ? 'slate.950' : 'white',
        border: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'slate.900' : 'black',
        boxShadow:
          props.colorMode === 'dark' ? '6px 6px 0 teal' : '6px 6px 0 black',
      },
      pimage: {
        borderBottomColor: props.colorMode === 'dark' ? 'slate.900' : 'black',
      },
      pbody: {
        color: props.colorMode === 'dark' ? 'slate.100' : 'slate.900',
      },
      pfooter: {
        borderTopColor: props.colorMode === 'dark' ? 'slate.900' : 'black',
      },
    }),
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary',
  },
});
export default PaperCard;
