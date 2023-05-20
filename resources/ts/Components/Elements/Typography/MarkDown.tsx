import remarkGfm from 'remark-gfm';
import { ProseHeadings, ProsePa, Prose } from './';
import { Link, TextProps } from '@chakra-ui/react';
interface MarkDownProps extends TextProps {
  content: string;
}

const MarkDown = ({ content, ...rest }: MarkDownProps) => {
  return (
    <Prose
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        p({ node, ...props }) {
          return <ProsePa {...props} {...rest} />;
        },
        a: ({ node, ...props }) => <Link {...props} />,
        h1: ({ node, ...props }) => (
          <ProseHeadings component="h1" size="xxl" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <ProseHeadings component="h2" size="xl" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <ProseHeadings component="h3" size="lg" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <ProseHeadings component="h4" size="md" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <ProseHeadings component="h5" size="sm" {...props} />
        ),
      }}
    />
  );
};
export default MarkDown;
