import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['main', 'container']);

export const FrontLayout = helpers.defineMultiStyleConfig({
  baseStyle: {
    main: {
      display: 'flex',
      direction: 'column',
      position: 'relative',
      flex: '1',
    },
    container: {
      maxWidth: '8xl',
    },
  },
  sizes: {
    sm: {
      main: {
        //
      },
      container: {
        px: '2',
      },
    },
    lg: {
      main: {
        //
      },
      container: {
        px: '8',
      },
    },
    xl: {
      main: {
        //
      },
      container: {
        px: '12',
      },
    },
  },
});
