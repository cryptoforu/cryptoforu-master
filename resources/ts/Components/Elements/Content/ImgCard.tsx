import { Box, Button, Flex } from '@chakra-ui/react';
import LazyImage from './LazyImage';
import { ProseHeadings, ProsePa, MarkDown } from '../Typography';
import { BtnLink } from '../Navigation';
import { EditIcon } from '@chakra-ui/icons';
type ImgCardProps = {
  image?: string;
  title?: string;
  category?: string;
  description?: string;
  to: string;
  params?: string | number;
  srcSet?: string;
};

const ImgCard = ({
  image,
  title,
  category,
  description,
  to,
  params,
}: ImgCardProps) => {
  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px" maxHeight="300px">
        <LazyImage
          imgProps={{
            img_name: image as string,
            objectFit: 'cover',
          }}
          boxProps={{
            maxWidth: 'full',
            height: 'auto',
          }}
        />
      </Box>
      <Flex direction="column">
        <ProsePa mb="10px">{category}</ProsePa>
        <ProseHeadings component="h3" size="lg">
          {title}
        </ProseHeadings>
        <MarkDown content={description as string} />
        <Flex justifyContent="space-between">
          <BtnLink
            to={to}
            params={params}
            component={Button}
            rightIcon={<EditIcon />}
            variant="outline"
            colorScheme="emerald"
            size="md"
          >
            Edit
          </BtnLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ImgCard;
