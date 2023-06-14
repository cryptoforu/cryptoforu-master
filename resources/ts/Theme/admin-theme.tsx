import { extendTheme } from '@chakra-ui/react';

import { containerTheme } from '@/Theme/Layouts';

import { PrimaryButton, SettingsContent } from './Components/Admin';
import {
  NavigationLink,
  Prose,
  ProseHeadings,
  ProsePa,
} from './Components/Shared';
import { colors } from './Styles/colors';
import { config, fonts, styles } from './Styles/global';

const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
  components: {
    Container: containerTheme,
    Prose,
    ProsePa,
    ProseHeadings,
    SettingsContent,
    NavigationLink,
    PrimaryButton,
  },
});
export default theme;
