import { defineStyleConfig, StyleFunctionProps } from '@chakra-ui/react';

import { em, rem, round } from '../../utils/convert';

const Prose = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    fontWeight: 'medium',
    'div > ul': {
      marginTop: em(16, 14),
      marginBottom: em(16, 14),
      paddingLeft: em(22, 14),
    },
    a: {
      color: 'emerald.500',
      textDecoration: 'underline',
    },
    ol: {
      marginTop: em(20, 16),
      marginBottom: em(20, 16),
      paddingLeft: em(26, 16),
    },
    ul: {
      marginTop: em(20, 16),
      marginBottom: em(20, 16),
      paddingLeft: em(26, 16),
    },
    li: {
      marginTop: em(8, 16),
      marginBottom: em(8, 16),
      textColor: props.colorMode === 'dark' ? 'slate.300' : 'slate.600',
    },
    'ol > li': {
      paddingLeft: em(6, 16),
    },
    'ul > li': {
      paddingLeft: em(6, 16),
    },
    '> ul > li p': {
      marginTop: em(12, 16),
      marginBottom: em(12, 16),
    },
    '> ul > li > *:first-of-type': {
      marginTop: em(20, 16),
    },
    '> ul > li > *:last-child': {
      marginBottom: em(20, 16),
    },
    '> ol > li > *:first-of-type': {
      marginTop: em(20, 16),
    },
    '> ol > li > *:last-child': {
      marginBottom: em(20, 16),
    },
    'ul ul, ul ol, ol ul, ol ol': {
      marginTop: em(12, 16),
      marginBottom: em(12, 16),
    },
    hr: {
      marginTop: em(48, 16),
      marginBottom: em(48, 16),
    },
    'hr + *': {
      marginTop: '0',
    },
    'h2 + *': {
      marginTop: '0',
    },
    'h3 + *': {
      marginTop: '0',
    },
    'h4 + *': {
      marginTop: '0',
    },
    table: {
      fontSize: em(14, 16),
      lineHeight: round(24 / 14),
    },
    'thead th': {
      paddingRight: em(8, 14),
      paddingBottom: em(8, 14),
      paddingLeft: em(8, 14),
    },
    'thead th:first-of-type': {
      paddingLeft: '0',
    },
    'thead th:last-child': {
      paddingRight: '0',
    },
    'tbody td, tfoot td': {
      paddingTop: em(8, 14),
      paddingRight: em(8, 14),
      paddingBottom: em(8, 14),
      paddingLeft: em(8, 14),
    },
    'tbody td:first-of-type, tfoot td:first-of-type': {
      paddingLeft: '0',
    },
    'tbody td:last-child, tfoot td:last-child': {
      paddingRight: '0',
    },
  }),
  variants: {
    primary: (props: StyleFunctionProps) => ({
      maxWidth: '65ch',
      p: {
        textColor: props.colorMode === 'dark' ? 'slate.400' : 'slate.600',
      },
    }),
    secondary: {
      maxWidth: '5xl',
    },
    small: {
      maxWidth: '2xl',
    },
  },
  sizes: {
    base: {
      fontSize: rem(16),
      lineHeight: round(28 / 16),
      p: {
        marginTop: em(20, 16),
        marginBottom: em(20, 16),
      },
      '[class~="lead"]': {
        fontSize: em(20, 16),
        lineHeight: round(32 / 20),
        marginTop: em(24, 20),
        marginBottom: em(24, 20),
      },
      blockquote: {
        marginTop: em(32, 20),
        marginBottom: em(32, 20),
        paddingLeft: em(20, 20),
      },
      h1: {
        fontSize: em(36, 16),
        marginTop: '0',
        marginBottom: em(32, 36),
        lineHeight: round(40 / 36),
      },
      h2: {
        fontSize: em(24, 16),
        marginTop: em(48, 24),
        marginBottom: em(24, 24),
        lineHeight: round(32 / 24),
      },
      h3: {
        fontSize: em(20, 16),
        marginTop: em(32, 20),
        marginBottom: em(12, 20),
        lineHeight: round(32 / 20),
      },
      h4: {
        marginTop: em(24, 16),
        marginBottom: em(8, 16),
        lineHeight: round(24 / 16),
      },
      img: {
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
      },
      video: {
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
      },
      figure: {
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
      },
      'figure > *': {
        marginTop: '0',
        marginBottom: '0',
      },
      figcaption: {
        fontSize: em(14, 16),
        lineHeight: round(20 / 14),
        marginTop: em(12, 14),
      },
      code: {
        fontSize: em(14, 16),
      },
      'h2 code': {
        fontSize: em(21, 24),
      },
      'h3 code': {
        fontSize: em(18, 20),
      },
      pre: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
        marginTop: em(24, 14),
        marginBottom: em(24, 14),
        borderRadius: rem(6),
        paddingTop: em(12, 14),
        paddingRight: em(16, 14),
        paddingBottom: em(12, 14),
        paddingLeft: em(16, 14),
      },
      ol: {
        marginTop: em(20, 16),
        marginBottom: em(20, 16),
        paddingLeft: em(26, 16),
      },
      ul: {
        marginTop: em(20, 16),
        marginBottom: em(20, 16),
        paddingLeft: em(26, 16),
      },
      li: {
        marginTop: em(8, 16),
        marginBottom: em(8, 16),
      },
      'ol > li': {
        paddingLeft: em(6, 16),
      },
      'ul > li': {
        paddingLeft: em(6, 16),
      },
      '> ul > li p': {
        marginTop: em(12, 16),
        marginBottom: em(12, 16),
      },
      '> ul > li > *:first-of-type': {
        marginTop: em(20, 16),
      },
      '> ul > li > *:last-child': {
        marginBottom: em(20, 16),
      },
      '> ol > li > *:first-of-type': {
        marginTop: em(20, 16),
      },
      '> ol > li > *:last-child': {
        marginBottom: em(20, 16),
      },
      'ul ul, ul ol, ol ul, ol ol': {
        marginTop: em(12, 16),
        marginBottom: em(12, 16),
      },
      hr: {
        marginTop: em(48, 16),
        marginBottom: em(48, 16),
      },
      'hr + *': {
        marginTop: '0',
      },
      'h2 + *': {
        marginTop: '0',
      },
      'h3 + *': {
        marginTop: '0',
      },
      'h4 + *': {
        marginTop: '0',
      },
      table: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
      },
      'thead th': {
        paddingRight: em(8, 14),
        paddingBottom: em(8, 14),
        paddingLeft: em(8, 14),
      },
      'thead th:first-of-type': {
        paddingLeft: '0',
      },
      'thead th:last-child': {
        paddingRight: '0',
      },
      'tbody td, tfoot td': {
        paddingTop: em(8, 14),
        paddingRight: em(8, 14),
        paddingBottom: em(8, 14),
        paddingLeft: em(8, 14),
      },
      'tbody td:first-of-type, tfoot td:first-of-type': {
        paddingLeft: '0',
      },
      'tbody td:last-child, tfoot td:last-child': {
        paddingRight: '0',
      },
    },
    lg: {
      fontSize: rem(18),
      lineHeight: round(32 / 18),
      p: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
      },
      '[class~="lead"]': {
        fontSize: em(22, 18),
        lineHeight: round(32 / 22),
        marginTop: em(24, 22),
        marginBottom: em(24, 22),
      },
      blockquote: {
        marginTop: em(40, 24),
        marginBottom: em(40, 24),
        paddingLeft: em(24, 24),
      },
      h1: {
        fontSize: em(48, 18),
        marginTop: '0',
        marginBottom: em(40, 48),
        lineHeight: round(48 / 48),
      },
      h2: {
        fontSize: em(30, 18),
        marginTop: em(56, 30),
        marginBottom: em(32, 30),
        lineHeight: round(40 / 30),
      },
      h3: {
        fontSize: em(24, 18),
        marginTop: em(40, 24),
        marginBottom: em(16, 24),
        lineHeight: round(36 / 24),
      },
      h4: {
        marginTop: em(32, 18),
        marginBottom: em(8, 18),
        lineHeight: round(28 / 18),
      },
      img: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
      },
      video: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
      },
      figure: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
      },
      'figure > *': {
        marginTop: '0',
        marginBottom: '0',
      },
      figcaption: {
        fontSize: em(16, 18),
        lineHeight: round(24 / 16),
        marginTop: em(16, 16),
      },
      code: {
        fontSize: em(16, 18),
      },
      'h2 code': {
        fontSize: em(26, 30),
      },
      'h3 code': {
        fontSize: em(21, 24),
      },
      pre: {
        fontSize: em(16, 18),
        lineHeight: round(28 / 16),
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
        borderRadius: rem(6),
        paddingTop: em(16, 16),
        paddingRight: em(24, 16),
        paddingBottom: em(16, 16),
        paddingLeft: em(24, 16),
      },
      ol: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
        paddingLeft: em(28, 18),
      },
      ul: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
        paddingLeft: em(28, 18),
      },
      li: {
        marginTop: em(12, 18),
        marginBottom: em(12, 18),
      },
      'ol > li': {
        paddingLeft: em(8, 18),
      },
      'ul > li': {
        paddingLeft: em(8, 18),
      },
      '> ul > li p': {
        marginTop: em(16, 18),
        marginBottom: em(16, 18),
      },
      '> ul > li > *:first-of-type': {
        marginTop: em(24, 18),
      },
      '> ul > li > *:last-child': {
        marginBottom: em(24, 18),
      },
      '> ol > li > *:first-of-type': {
        marginTop: em(24, 18),
      },
      '> ol > li > *:last-child': {
        marginBottom: em(24, 18),
      },
      'ul ul, ul ol, ol ul, ol ol': {
        marginTop: em(16, 18),
        marginBottom: em(16, 18),
      },
      hr: {
        marginTop: em(56, 18),
        marginBottom: em(56, 18),
      },
      'hr + *': {
        marginTop: '0',
      },
      'h2 + *': {
        marginTop: '0',
      },
      'h3 + *': {
        marginTop: '0',
      },
      'h4 + *': {
        marginTop: '0',
      },
      table: {
        fontSize: em(16, 18),
        lineHeight: round(24 / 16),
      },
      'thead th': {
        paddingRight: em(12, 16),
        paddingBottom: em(12, 16),
        paddingLeft: em(12, 16),
      },
      'thead th:first-of-type': {
        paddingLeft: '0',
      },
      'thead th:last-child': {
        paddingRight: '0',
      },
      'tbody td, tfoot td': {
        paddingTop: em(12, 16),
        paddingRight: em(12, 16),
        paddingBottom: em(12, 16),
        paddingLeft: em(12, 16),
      },
      'tbody td:first-of-type, tfoot td:first-of-type': {
        paddingLeft: '0',
      },
      'tbody td:last-child, tfoot td:last-child': {
        paddingRight: '0',
      },
    },
  },
  defaultProps: {
    size: 'base',
    variant: 'primary',
  },
});
export default Prose;
