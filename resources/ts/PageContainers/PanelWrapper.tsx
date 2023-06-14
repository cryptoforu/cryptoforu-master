import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, m } from 'framer-motion';
import { PropsWithChildren } from 'react';
const Panel = chakra(m.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { type: 'spring', duration: 2, ease: 'easeInOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 2, ease: 'easeInOut' },
  },
};

const PanelWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Panel
      initial="hidden"
      animate="visible"
      variants={variants}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {children}
    </Panel>
  );
};

export default PanelWrapper;
