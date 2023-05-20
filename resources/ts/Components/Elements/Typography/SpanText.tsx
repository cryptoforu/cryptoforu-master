import {
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  chakra,
  forwardRef,
} from '@chakra-ui/react';

export interface GradientProps extends HTMLChakraProps<'span'>, ThemingProps {}

const SpanText = forwardRef<GradientProps, 'span'>((props, ref) => {
  const { size, variant, ...rest } = props;
  const styles = useStyleConfig('ProseHeadings', { size, variant });

  return <chakra.span ref={ref} __css={styles} {...rest} />;
});
export default SpanText;
