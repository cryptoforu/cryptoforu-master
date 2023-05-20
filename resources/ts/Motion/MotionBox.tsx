import { chakra, shouldForwardProp, BoxProps } from '@chakra-ui/react';
import { m, isValidMotionProp, Variants } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

export interface IMotionBoxProps extends PropsWithChildren<BoxProps> {
  variants?: Variants;
  direction?: number;
}

const ChakraBox = chakra(m.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionBox = ({
  variants,
  direction,
  children,
  ...props
}: IMotionBoxProps) => {
  return (
    <ChakraBox
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      variants={variants}
      {...props}
    >
      {children}
    </ChakraBox>
  );
};

export default MotionBox;
