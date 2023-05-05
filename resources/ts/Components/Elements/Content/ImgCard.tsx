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
  srcSet,
}: ImgCardProps) => {
  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <LazyImage
          imgProps={{
            loading: 'lazy',
            src: image,
            srcSet: srcSet,
            sizes: '(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw',
            rounded: 'md',
          }}
          boxProps={{
            maxWidth: '500px',
            height: 'auto',
          }}
        />
      </Box>
      <Flex direction="column">
        <ProsePa mb="10px">{category}</ProsePa>
        <ProseHeadings component="h3" size="lg">
          {title}
        </ProseHeadings>
        <MarkDown
          content={description as string}
          linkProps={{ color: 'emerald.400', isExternal: true }}
        />
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
