import {
  ThemingProps,
  useStyleConfig,
  forwardRef,
  HTMLChakraProps,
  chakra,
} from '@chakra-ui/react';

export interface ProsePaProps extends HTMLChakraProps<'p'>, ThemingProps {}

const ProsePa = forwardRef<ProsePaProps, 'p'>(function ProsePa(props, ref) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig('ProsePa', { variant, size });
  return <chakra.p ref={ref} __css={styles} {...rest} />;
});

export default ProsePa;
