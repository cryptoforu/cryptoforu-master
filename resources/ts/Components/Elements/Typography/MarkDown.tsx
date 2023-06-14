import { Link, TextProps } from '@chakra-ui/react';
import remarkGfm from 'remark-gfm';

import { Prose, ProseHeadings, ProsePa } from './';

interface MarkDownProps extends TextProps {
  content: string;
}

const MarkDown = ({ content, ...rest }: MarkDownProps) => {
  return (
    <Prose
      /* eslint-disable-next-line react/no-children-prop */
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        p({ ...props }) {
          return <ProsePa {...props} {...rest} />;
        },
        a: ({ ...props }) => <Link {...props} />,
        h1: ({ ...props }) => (
          <ProseHeadings component="h1" size="xxl" {...props} />
        ),
        h2: ({ ...props }) => (
          <ProseHeadings component="h2" size="xl" {...props} />
        ),
        h3: ({ ...props }) => (
          <ProseHeadings component="h3" size="lg" {...props} />
        ),
        h4: ({ ...props }) => (
          <ProseHeadings component="h4" size="md" {...props} />
        ),
        h5: ({ ...props }) => (
          <ProseHeadings component="h5" size="sm" {...props} />
        ),
      }}
    />
  );
};
export default MarkDown;
