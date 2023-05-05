import remarkGfm from 'remark-gfm';
import { ProseHeadings, ProsePa, Prose } from './';
import { Link, LinkProps } from '@chakra-ui/react';

interface MarkDownProps {
  content: string;
  linkProps?: LinkProps;
}

const MarkDown = ({ content, linkProps }: MarkDownProps) => {
  return (
    <Prose
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        p({ ...props }) {
          return <ProsePa {...props} />;
        },
        a({ children, href }) {
          return <Link {...linkProps} children={children} href={href} />;
        },
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
