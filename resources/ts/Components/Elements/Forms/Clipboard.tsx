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
      variant="filled"
      size="sm"
      isReadOnly={true}
      value={value}
      onTap={onCopy}
      bgColor={hasCopied ? 'emerald.500' : 'transparent'}
    />
  );
};

export default Clipboard;
