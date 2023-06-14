import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import { ButtonLink } from '../Navigation';
import { MarkDown, ProseHeadings, ProsePa } from '../Typography';
import LazyImage from './LazyImage';
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
          <ButtonLink
            to={to}
            params={params}
            rightIcon={<EditIcon />}
            variant="outline"
            colorScheme="emerald"
            size="md"
          >
            Edit
          </ButtonLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ImgCard;
