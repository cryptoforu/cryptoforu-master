import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';
import { round, em } from '../utils/convert';
export const Prose = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    fontWeight: 'medium',
    'div > ul': {
      marginTop: em(16, 14),
      marginBottom: em(16, 14),
      paddingLeft: em(22, 14),
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
  }),
  variants: {
    primary: {
      maxWidth: '65ch',
    },
    secondary: {
      maxWidth: '5xl',
    },
    small: {
      maxWidth: '2xl',
    },
  },
  defaultProps: {
    size: '',
    variant: 'primary',
  },
});
