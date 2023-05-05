import {
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  chakra,
  forwardRef,
} from '@chakra-ui/react';

type HeadingComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface ProseHeadingProps
  extends HTMLChakraProps<HeadingComponent>,
    ThemingProps {
  component: HeadingComponent;
}
const Heading = chakra((component) => component);

const ProseHeadings = forwardRef<ProseHeadingProps, HeadingComponent>(
  function ProseHeading(props, ref) {
    const { size, variant, component, ...rest } = props;
    const styles = useStyleConfig('ProseHeadings', { size, variant });

    return <Heading as={component} ref={ref} __css={styles} {...rest} />;
  }
);

export default ProseHeadings;
