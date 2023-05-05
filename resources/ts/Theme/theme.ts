import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { inputTheme } from './Styles/inputTheme';
import {
  buttonTheme,
  textareaTheme,
  selectTheme,
  tabsTheme,
  containerCard,
  Prose,
  ProsePa,
  ProseHeadings,
  EditInput,
  NavigationLink,
  SettingsContent,
  LazyImage,
  popoverTheme,
} from './Components';
import { containerTheme } from './Layouts';
import { TagsInput } from './Styles/checkBoxTheme';
import { textStyles } from './Styles/prose';
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};
const fonts = {
  body: 'Space Mono, monospace',
  heading: 'Space Mono, monospace',
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('slate.950', 'emerald.100')(props),
      bg: mode('emerald.50', 'slate.950')(props),
      display: 'flex',
      flexDirection: 'column',
      height: 'full',
      overflowX: 'hidden',
    },
    '::-webkit-scrollbar': {
      width: '5px',
    },
    '::-webkit-scrollbar-track': {
      bg: mode('slate.200', 'slate.900')(props),
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'emerald.500',
    },
    '::-webkit-scrollbar-thumb': {
      bgImage: '-webkit-linear-gradient(45deg, #6366f1, #22d3ee)',
    },
  }),
};

const colors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#022c22',
  },
  gradLime: 'linear(to-l, green.200, emerald.200)',
};

const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
  textStyles,
  components: {
    Input: inputTheme,
    Textarea: textareaTheme,
    Button: buttonTheme,
    Select: selectTheme,
    Tabs: tabsTheme,
    Card: containerCard,
    Container: containerTheme,
    Popover: popoverTheme,
    Prose,
    ProsePa,
    ProseHeadings,
    TagsInput,
    EditInput,
    NavigationLink,
    SettingsContent,
    LazyImage,
  },
});
export default theme;
