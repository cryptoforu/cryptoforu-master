import { useEffect } from 'react';
import {
  chakra,
  shouldForwardProp,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import {
  m,
  AnimatePresence,
  useAnimate,
  usePresence,
  isValidMotionProp,
} from 'framer-motion';

const MotionBox = chakra(m.span, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function HoverComponent() {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 0.15 });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: 0 },
          { duration: 0.15, delay: 0.2 }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [animate, isPresent, safeToRemove, scope]);

  return (
    <MotionBox
      ref={scope}
      position="absolute"
      inset={0}
      rounded="lg"
      bg={mode('slateAlpha.100', 'blackAlpha.700')}
      layoutId="hoverBackground"
    />
  );
}

const HoverLink = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <AnimatePresence>{isHovered ? <HoverComponent /> : null}</AnimatePresence>
  );
};
export default HoverLink;
