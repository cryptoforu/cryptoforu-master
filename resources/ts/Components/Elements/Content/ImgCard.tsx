import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import { useMenuSelectContext } from '@/Store/useMenuSelect';

import { ButtonLink } from '../Navigation';
import { MarkDown, ProseHeadings, ProsePa } from '../Typography';
import LazyImage from './LazyImage';

type ImgCardProps = {
  image?: string;
  title?: string;
  category?: string;
  description?: string;
  to: string;
  destroy: string;
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
  destroy,
}: ImgCardProps) => {
  const selected = useMenuSelectContext((state) => state.selected);
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
            options={{
              preserveState: true,
              preserveScroll: true,
              only: [selected],
            }}
            rightIcon={<EditIcon />}
            variant="outline"
            colorScheme="emerald"
            size="md"
          >
            Edit
          </ButtonLink>
          <ButtonLink
            to={destroy}
            params={params}
            options={{
              method: 'delete',
              preserveState: true,
              preserveScroll: true,
              only: [selected],
            }}
            rightIcon={<DeleteIcon />}
            colorScheme={'red'}
          >
            Delete
          </ButtonLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ImgCard;
