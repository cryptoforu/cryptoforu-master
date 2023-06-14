import { Flex, Td } from '@chakra-ui/react';

import { LazyImage } from '@/Components/Elements/Content';
import { ProseHeadings } from '@/Components/Elements/Typography';

interface ImageTitleCellProps {
  title: string;
  image: string;
}

const ImageTitleCell = ({ title, image }: ImageTitleCellProps) => {
  return (
    <Td maxWidth="250px">
      <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
        <LazyImage
          boxProps={{
            maxWidth: '30%',
            me: '18px',
          }}
          imgProps={{
            img_name: image,
            rounded: 'md',
          }}
        />
        <ProseHeadings component="h3" noOfLines={2}>
          {title}
        </ProseHeadings>
      </Flex>
    </Td>
  );
};

export default ImageTitleCell;
