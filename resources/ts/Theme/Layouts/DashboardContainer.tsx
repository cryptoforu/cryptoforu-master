import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const panelVariant = defineStyle(() => {
  return {
    maxWidth: '8xl',
    mx: 'auto',
    px: {
      base: '4',
      md: '6',
      lg: '8',
    },
    pb: '12',
  };
});

const panelContainer = defineStyle(() => {
  return {
    ms: 'auto',
    me: 'auto',
    ps: '15px',
    pe: '15px',
  };
});

export const containerTheme = defineStyleConfig({
  variants: {
    panel: panelVariant,
    content: panelContainer,
  },
});
