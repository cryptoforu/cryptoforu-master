import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const mainVariant = definePartsStyle((props) => {
  return {
    container: {
      align: 'center',
      boxShadow: mode('0px 7px 23px rgba(0, 0, 0, 0.05)', 'slate.900')(props),
      bg: mode('slate.50', 'slate.900')(props),
      color: mode('slate.900', 'emerald.300')(props),

      borderRadius: 'lg',
      filter: mode(
        'none',
        'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))'
      )(props),
      backdropFilter: 'blur(21px)',
      mx: '16px',
      mt: '12px',
    },
    body: {
      //
    },
  };
});

const accordionVariant = definePartsStyle((props) => {
  return {
    container: {
      border: '2px solid',
      bg: 'transparent',
      borderColor: mode('slate.100', 'slate.800')(props),
      color: mode('slate.100', 'slate.800')(props),
    },
    header: {
      rounded: 'lg',
      mx: '2',
      mt: '2',
      p: '2',
      _hover: {
        bgGradient: 'linear(to-l, green.300, teal.200)',
        color: 'slate.700',
      },
    },
  };
});

const primaryVariant = definePartsStyle((props) => {
  return {
    container: {
      display: 'flex',
      width: '100%',
      maxWidth: '8xl',
      padding: '4',
      rounded: 'lg',
      bg: mode('slate.200', 'slate.950')(props),
      color: mode('slate.800', 'slate.100')(props),
      shadow: 'lg',
      boxShadow: mode('0px 7px 23px rgba(0, 0, 0, 0.05)', 'slate.950')(props),
    },
    body: {
      fontSize: 'md',
      fontWeight: 'semibold',
    },
  };
});

const variants = {
  containerCard: mainVariant,
  accordion: accordionVariant,
  primary: primaryVariant,
};

export const containerCard = defineMultiStyleConfig({ variants });
