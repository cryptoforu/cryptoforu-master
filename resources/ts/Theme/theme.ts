import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { styles } from './Styles/global';
import { colors } from './Styles/colors';
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
  MainNav,
  GlowCard,
  PaperCard,
} from './Components';
import { containerTheme } from './Layouts';
import { TagsInput } from './Styles/checkBoxTheme';
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};
const fonts = {
  body: 'Space Mono, monospace',
  heading: 'Space Mono, monospace',
  '.fontsource-space-mono': {
    'font-family': 'Space Mono, monospace',
  },
};

const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
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
    MainNav,
    GlowCard,
    PaperCard,
  },
});
export default theme;
