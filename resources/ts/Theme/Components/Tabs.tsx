import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: 'medium',
    transition: 'all 0.3s',
  },
  tabpanel: {
    // change
  },
});

// define a custom variant
const mainVariant = definePartsStyle((props) => {
  return {
    tab: {
      position: 'relative',
      _selected: {
        bg: mode('emerald.100', 'slate.800')(props),
        color: mode('slate.900', 'white')(props),
      },
      _hover: {
        bg: mode('emerald.100', 'slate.800')(props),
        color: mode('slate.900', 'white')(props),
      },
    },
    tablist: {
      //
    },
    tabpanel: {
      //
    },
    indicator: {
      width: props.orientation === 'vertical' ? '2px' : 'auto',
      height: props.orientation === 'vertical' ? 'auto' : '2px',
      position: 'absolute',
      insetY: props.orientation === 'vertical' ? 0 : undefined,
      left: props.orientation === 'vertical' ? 0 : undefined,
      insetX: props.orientation === 'horizontal' ? 0 : undefined,
      bottom: props.orientation === 'horizontal' ? 0 : undefined,
      bg: mode('emerald.100', 'emerald.500')(props),
      borderRadius: '1px',
      transition: 'all 0.3s',
    },
  };
});

const primaryVariant = definePartsStyle((props) => {
  return {
    tab: {
      display: 'flex',
      textAlign: 'left',
      justifyContent: 'start',
      alignItems: 'start',
      borderBottom: '1px',
      borderColor: mode('slate.100', 'slate.800')(props),
      padding: '4',
      _last: {
        borderColor: 'transparent',
      },
      color: mode('slate.700', 'slate.300')(props),
      _selected: {
        bg: mode('emerald.100', 'slate.950')(props),
        textColor: mode('emerald.950', 'emerald.100')(props),
        borderLeft: '3px',
        borderLeftColor: 'emerald.500',
        transition: 'all 0.3s',
      },
      _hover: {
        bg: mode('emerald.100', 'slate.950')(props),
        opacity: '0.5',
      },
    },
    tablist: {
      flex: '1',
    },
    indicator: {
      width: '3px',
      bg: mode('emerald.100', 'emerald.500')(props),
      position: 'absolute',
      insetY: 0,
      left: 0,
    },
  };
});

const variants = {
  main: mainVariant,
  primary: primaryVariant,
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ variants, baseStyle });
