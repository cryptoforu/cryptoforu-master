import { Td } from '@chakra-ui/react';

import { ProsePa } from '@/Components/Elements/Typography';

const TextCell = (label: string) => {
  return (
    <Td>
      <ProsePa>{label}</ProsePa>
    </Td>
  );
};

export default TextCell;
