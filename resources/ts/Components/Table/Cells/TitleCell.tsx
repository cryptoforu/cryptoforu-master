import { ProseHeadings } from '../../Elements/Typography';
import { Td } from '@chakra-ui/react';

const TitleCell = (title: string) => {
  return (
    <Td>
      <ProseHeadings component="h3" noOfLines={2}>
        {title}
      </ProseHeadings>
    </Td>
  );
};

export default TitleCell;
