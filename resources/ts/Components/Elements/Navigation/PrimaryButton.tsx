import {
  Button,
  chakra,
  forwardRef,
  HTMLChakraProps,
  shouldForwardProp,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { isValidMotionProp, m } from 'framer-motion';

import { btnOutline } from '@/Motion/variants';

export interface PrimaryButtonProps
  extends ThemingProps,
    HTMLChakraProps<'button'> {}

export const MotionBtn = chakra(m(Button), {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const PrimaryButton = forwardRef<PrimaryButtonProps, typeof MotionBtn>(
  function PrimaryButton(props, ref) {
    const { variant, ...rest } = props;
    const styles = useStyleConfig('PrimaryButton', { variant });
    return (
      <MotionBtn
        ref={ref}
        __css={styles}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={btnOutline}
        custom={variant === 'primary' ? '#34d399' : '#1e293b'}
        {...rest}
      />
    );
  }
);
export default PrimaryButton;
