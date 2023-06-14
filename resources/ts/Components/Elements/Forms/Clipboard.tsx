import { Input, useClipboard } from '@chakra-ui/react';
import { m } from 'framer-motion';

type ClipBoardProps = {
  copyVal: string;
};

const Clipboard = ({ copyVal }: ClipBoardProps) => {
  const { onCopy, value, hasCopied } = useClipboard(copyVal);
  return (
    <Input
      as={m.input}
      rounded="md"
      whileFocus={{ color: '#10b981' }}
      variant="filled"
      size="sm"
      isReadOnly={true}
      value={hasCopied ? 'Copied!' : value}
      onTap={onCopy}
      bgColor={hasCopied ? 'slateAlpha.700' : 'slateAlpha.400'}
    />
  );
};

export default Clipboard;
