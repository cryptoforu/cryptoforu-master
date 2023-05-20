import {
  useMultiStyleConfig,
  chakra,
  shouldForwardProp,
  ThemingProps,
} from '@chakra-ui/react';
import { glowVariants, cardVariants } from '@/Motion/variants';
import { m, isValidMotionProp, HTMLMotionProps } from 'framer-motion';

const MotionGlow = chakra(m.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface GlowProps extends ThemingProps, HTMLMotionProps<'div'> {}

const GlowCard = ({ ...props }: GlowProps) => {
  const { size, variant, children } = props;
  const styles = useMultiStyleConfig('GlowCard', { size, variant });
  return (
    <MotionGlow
      __css={styles.wrapper}
      initial="initial"
      whileHover="hover"
      exit="exit"
    >
      <MotionGlow
        __css={styles.glow}
        variants={glowVariants}
        transition={{
          type: 'spring',
          stiffness: '50',
        }}
      />
      <MotionGlow
        __css={styles.card}
        variants={cardVariants}
        transition={{
          type: 'spring',
          stiffness: '50',
        }}
      >
        {children}
      </MotionGlow>
    </MotionGlow>
  );
};
export default GlowCard;
