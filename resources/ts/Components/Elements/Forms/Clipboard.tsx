import { useClipboard, Input } from '@chakra-ui/react';
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
      variant="primary"
      size="sm"
      isReadOnly={true}
      value={hasCopied ? 'Copied!' : value}
      onTap={onCopy}
      bgColor={hasCopied ? 'slateAlpha.400' : 'transparent'}
    />
  );
};

export default Clipboard;
