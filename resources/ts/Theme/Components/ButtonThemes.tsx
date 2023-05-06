import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { variants } from './NavigationLink';
const sidebarBase = {
  boxSize: 'initial',
  justifyContent: 'flex-start',
  alignItems: 'center',
  mb: {
    xl: '6px',
  },
  mx: {
    xl: 'auto',
  },
  py: '8px',
  borderRadius: '15px',
  w: '100%',
  _active: {
    bg: 'inherit',
    transform: 'none',
    borderColor: 'transparent',
  },
  _focus: {
    boxShadow: 'none',
  },
  _hover: {
    bg: 'slate.100',
  },
  _dark: {
    _hover: {
      bg: 'slate.800',
    },
  },
  transition: 'colors 0.3s',
};

const sidebar = defineStyle({
  ...sidebarBase,
  bg: 'transparent',
});
const sidebarActive = defineStyle({
  ...sidebarBase,
  bg: 'emerald.100',
  _dark: {
    bg: 'blackAlpha.400',
  },
});

const gradLime = defineStyle({
  bgGradient: 'linear(to-l, green.300, teal.300)',
  color: 'slate.800',
  _hover: {
    bgGradient: 'linear(to-l, green.300, teal.200)',
    color: 'slate.700',
  },
  _focus: {
    outlineColor: 'slate.200',
  },
  _dark: {
    color: 'slate.900',
    _hover: {
      color: 'slate.800',
    },
  },
});

const gradPurple = defineStyle({
  bgGradient: 'linear(to-br, purple.600, blue.500)',
  color: 'slate.50',
  _hover: {
    bgGradient: 'linear(to-br, blue.400, purple.500)',
    color: 'slate.100',
  },
  _focus: {
    outlineColor: 'purple.300',
  },
  px: '3',
  py: '2',
});

const primaryBtn = defineStyle({
  bgGradient: 'linear(to-r, emerald.200, green.400, teal.200)',
  color: 'slate.800',
  _active: {
    bg: 'emerald.400',
  },
  _hover: {
    bgGradient: 'linear(to-r, teal.200, green.400, emerald.200)',
    color: 'primary.900',
  },
  _focus: {
    outline: '1px solid',
    outlineColor: 'emerald.100',
  },
  _dark: {
    _focus: {
      outline: '1px solid',
      outlineColor: 'emerald.100',
    },
  },
  rounded: 'full',
});

const sm = defineStyle({
  py: '1.5',
  px: '3',
  fontSize: 'sm',
  fontWeight: '500',
});

const md = defineStyle({
  py: '2',
  px: '4',
  fontSize: 'sm',
  fontWeight: '600',
});

export const buttonTheme = defineStyleConfig({
  variants: {
    sidebar,
    sidebarActive,
    gradLime,
    gradPurple,
    primaryBtn,
    ...variants,
  },
  sizes: {
    sm,
    md,
  },
});
