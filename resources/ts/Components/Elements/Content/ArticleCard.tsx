import { Box, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { m } from 'framer-motion';
import { ProseHeadings, ProsePa } from '../Typography';
import { HoverLink } from '@/Motion';
import useHover from '@/Hooks/useHover';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from '@inertiajs/react';
type ArticleProps = {
  title: string;
  desc: string;
  category: string;
  slug: string;
  id?: string | number;
};

const ArticleCard = (props: ArticleProps) => {
  const { slug, title, desc, category, id } = props;
  const { isHovered, onHover } = useHover();
  return (
    <LinkBox
      as={m.article}
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      p="8"
      onHoverStart={() => onHover(id)}
      onHoverEnd={() => onHover()}
    >
      <LinkOverlay as={Link} href={slug}>
        <ProseHeadings component="h2" size="md" display="flex" order="2">
          <HoverLink isHovered={isHovered(id)} id="article" />
          <Box as="span" position="relative" zIndex={10}>
            {title}
          </Box>
        </ProseHeadings>
        <ProsePa
          position="relative"
          display="flex"
          order="1"
          alignItems="center"
          zIndex={10}
          mb="3"
          pl="3.5"
        >
          <Box
            as="span"
            position="absolute"
            insetY="0"
            left="0"
            display="flex"
            alignItems="center"
            aria-hidden="true"
          >
            <Box
              as="span"
              height="4"
              width="0.5"
              rounded="full"
              bg="emerald.500"
            />
          </Box>
          {category}
        </ProsePa>
        <ProsePa position="relative" mt="2" noOfLines={4}>
          {desc}
        </ProsePa>
        <Box
          aria-hidden="true"
          position="relative"
          display="flex"
          alignItems="center"
          mt="4"
          fontWeight="medium"
          fontSize="sm"
          color="emerald.500"
        >
          Read More
          <ChevronRightIcon ml="2" w="4" h="4" stroke="current" />
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};
export default ArticleCard;
