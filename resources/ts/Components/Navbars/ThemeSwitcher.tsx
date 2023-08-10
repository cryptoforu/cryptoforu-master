import {
  chakra,
  Icon,
  IconButton,
  shouldForwardProp,
  useColorMode,
} from '@chakra-ui/react';
import {
  AnimatePresence,
  isValidMotionProp,
  m,
  useAnimate,
  usePresence,
} from 'framer-motion';
import { useEffect } from 'react';

const ToogleButton = chakra(m(IconButton), {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
  baseStyle: {
    px: '2',
    outline: 'none',
  },
});

function AnimatedIcon({ path }: { path: string }) {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          'path',
          { pathLength: 1 },
          { duration: 0.3, ease: 'easeIn' }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          'path',
          { pathLength: 0 },
          { duration: 0.3, ease: 'easeOut' }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [animate, isPresent, safeToRemove, scope]);
  return (
    <Icon
      ref={scope}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentcolor"
      width="24px"
      height="24px"
      fill="none"
    >
      <chakra.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={path}
        pathLength={0}
      />
    </Icon>
  );
}

const paths = {
  dark: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z',
  light:
    'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
};

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const current = paths[colorMode];
  return (
    <AnimatePresence mode="wait">
      <ToogleButton
        key={current}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.2 }}
        aria-label="Theme Switcher"
        onClick={toggleColorMode}
      >
        <AnimatedIcon path={current} />
      </ToogleButton>
    </AnimatePresence>
  );
};

export default ThemeSwitcher;
