import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { StyleFunctionProps } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['wrapper', 'glow', 'card']);

export const GlowCard = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    wrapper: {
      position: 'relative',
      width: 'full',
      height: 'full',
      border: '1px solid',
      borderRadius: '16px',
      borderColor: props.colorMode === 'dark' ? 'slate.900' : 'slate.100',
    },
    glow: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      boxShadow: '2px 2px 2px 2px rgba(54, 180, 159, 0.95)',
      borderRadius: '16px',
    },
    card: {
      borderRadius: '16px',
      marginBottom: '0px',
      overflow: 'hidden',
      background:
        props.colorMode === 'dark' ? 'primaryAlpha.950' : 'emerald.100',
      position: 'relative',
      padding: '36px 24px',
      height: '100%',
    },
  }),
});
