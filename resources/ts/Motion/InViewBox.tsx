import { useEffect } from 'react';
import { Box, HTMLChakraProps, SimpleGrid, Grid } from '@chakra-ui/react';
import {
  useInView,
  useAnimate,
  DOMKeyframesDefinition,
  AnimationOptionsWithValueOverrides,
  stagger,
  ElementOrSelector,
} from 'framer-motion';

type Component = typeof Box | typeof SimpleGrid | typeof Grid;

export interface InViewBoxProps extends HTMLChakraProps<Component> {
  options?: DOMKeyframesDefinition;
  trans?: AnimationOptionsWithValueOverrides;
  component: Component;
  childType: ElementOrSelector;
}

const InViewBox = ({ children, ...props }: InViewBoxProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.5 });
  const { options, trans, component, childType, ...rest } = props;
  useEffect(() => {
    animate(scope.current, { ...options }, { ...trans });
    animate(childType, isInView ? { y: 0 } : { y: 50 }, {
      duration: 0.3,
      delay: stagger(0.15, { startDelay: 0.1 }),
    });
  }, [animate, childType, isInView, options, scope, trans]);
  console.log(scope);
  return (
    <Box as={component} ref={scope} {...rest}>
      {children}
    </Box>
  );
};
export default InViewBox;
