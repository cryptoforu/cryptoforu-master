import {
  useColorMode,
  chakra,
  shouldForwardProp,
  Button,
  Avatar,
} from '@chakra-ui/react';

import { m, isValidMotionProp, AnimatePresence } from 'framer-motion';

const ToogleButton = chakra(m(Button), {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
  baseStyle: {
    px: '2',
    outline: 'none',
  },
});

const MotionIcon = chakra(m(Avatar), {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
  baseStyle: {
    width: '8',
    height: '8',
  },
});

const variants = {
  enter: (direction: string) => {
    return {
      y: direction === 'dark' ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: string) => {
    return {
      zIndex: 0,
      y: direction === 'light' ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <AnimatePresence initial={false}>
      <ToogleButton
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.2 }}
        aria-label="Theme Switcher"
        variant={'ghost'}
        onClick={toggleColorMode}
      >
        {colorMode === 'dark' ? (
          <MotionIcon
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 1 },
            }}
            src="/img/cache/original/fog_240px.png"
            name="Theme Switcher"
          />
        ) : (
          <MotionIcon
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 1 },
            }}
            src="/img/cache/original/cool_240px.png"
            name="Theme Switcher"
          />
        )}
      </ToogleButton>
    </AnimatePresence>
  );
};

export default ThemeSwitcher;
