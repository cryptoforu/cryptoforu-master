import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
type DivProps = HTMLChakraProps<'div'> & ThemingProps & ReactMarkdownOptions;

const Markdown = chakra(ReactMarkdown);

const Prose = forwardRef<DivProps, 'div'>(function Prose(props, ref) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig('Prose', { variant, size });
  return <Markdown ref={ref} __css={styles} {...rest} />;
});

export default Prose;
