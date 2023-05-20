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

const primaryBtn = defineStyle({
  bgGradient: 'linear(to-r, teal.200, emerald.200)',
  color: 'primaryDark',
  _active: {
    bg: 'emerald.400',
  },
  _hover: {
    bgGradient: 'linear(to-l, teal.200, green.200)',
    color: 'slate.900',
  },
  _focus: {
    outline: '2.5px solid',
    outlineColor: 'emerald.500',
  },
  _dark: {
    _focus: {
      outline: '2.5px solid',
      outlineColor: 'emerald.400',
    },
  },
});
const secondaryBtn = defineStyle({
  bg: 'slate.900',
  color: 'slate.50',
  _active: {
    bg: 'slate.800',
  },
  _hover: {
    bg: 'slate.800',
    color: 'slate.100',
  },
  _focus: {
    outline: '2.5px solid',
    outlineColor: 'slate.900',
  },
  _dark: {
    _focus: {
      outline: '2.5px solid',
      outlineColor: 'slate.900',
    },
  },
});
const submitBtn = defineStyle({
  bgGradient: 'linear(to-r, cyan.400, blue.400)',
  color: 'slate.950',
  _active: {
    bg: 'blue.500',
  },
  _hover: {
    bgGradient: 'linear(to-r, cyan.300, blue.300)',
    color: 'slate.900',
  },
  _focus: {
    ring: '2.5px',
    ringColor: 'slate.300',
  },
  _dark: {
    _focus: {
      ring: '2.5px',
      ringColor: 'slate.300',
    },
  },
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
  fontSize: 'md',
  fontWeight: '600',
  letterSpacing: '-0.025em',
});

export const buttonTheme = defineStyleConfig({
  variants: {
    sidebar,
    sidebarActive,
    primaryBtn,
    secondaryBtn,
    submitBtn,
    ...variants,
  },
  sizes: {
    sm,
    md,
  },
});
