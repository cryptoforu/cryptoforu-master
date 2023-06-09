import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { theme } from '@/Theme';

interface ThemeProps extends PropsWithChildren {
  cookies: string;
}

const ThemeProvider = ({ children, cookies }: ThemeProps) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <>
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </>
  );
};
export default ThemeProvider;
