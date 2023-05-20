import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  useColorModeValue as mode,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { m } from 'framer-motion';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { HoverLink } from '@/Motion';
import { LazyImage } from '@/Components/Elements/Content';
import useHover from '@/Hooks/useHover';
import { HashtagIcon } from '@heroicons/react/24/outline/index.js';
import { ProseHeadings } from '@/Components/Elements/Typography';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { TagsData } from '@/Types/generated';
import { IHomeData } from '../home-types';
const SocialSidebar = () => {
  const { tags } = usePageProps<TagsData[]>();
  const { social_links } =
    usePageProps<Pick<IHomeData['data'], 'social_links'>>().data;
  const { isHovered, onHover } = useHover();
  return (
    <Flex direction="column" gap={10} pl={{ lg: '16', xl: '24' }}>
      <Card
        overflow="hidden"
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        maxWidth="md"
        mx="auto"
      >
        <CardHeader>
          <ProseHeadings component="h4" size="md" variant="proseSlateLight">
            Popular Tags
          </ProseHeadings>
        </CardHeader>
        <CardBody>
          <Flex wrap="wrap" gap={4} justify="center">
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                size="md"
                bg={mode('#151f21', 'gray.900')}
                color="white"
              >
                <TagLeftIcon boxSize="12px" as={HashtagIcon} />
                <TagLabel>{tag.name}</TagLabel>
              </Tag>
            ))}
          </Flex>
        </CardBody>
      </Card>
      <Card
        overflow="hidden"
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        maxWidth="md"
        mx="auto"
      >
        <CardHeader>
          <ProseHeadings component="h4" size="md" variant="proseSlateLight">
            Advertisement
          </ProseHeadings>
        </CardHeader>
        <CardBody>
          <LazyImage
            boxProps={{
              maxWidth: 'full',
              height: 'auto',
              rounded: 'md',
            }}
            imgProps={{
              img_name: '6452b304639ab.webp',
              query: {
                sm: 600,
                md: 900,
                lg: 1800,
              },
              alt: 'advetisement',
              htmlHeight: '1200px',
              htmlWidth: '1800px',
            }}
          />
        </CardBody>
      </Card>
      <Card
        overflow="hidden"
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        maxWidth="md"
        mx="auto"
      >
        <CardHeader>
          <ProseHeadings component="h4" size="md" variant="proseSlateLight">
            Follow Us On Social Media
          </ProseHeadings>
        </CardHeader>
        <CardBody>
          <Wrap display="flex" flexDirection="column" gap="4">
            {social_links.map((social) => (
              <LinkBox
                as={m.li}
                onHoverStart={() => onHover(social.name)}
                onHoverEnd={() => onHover()}
                key={social.name}
                display="flex"
                width="full"
                position="relative"
              >
                <LinkOverlay
                  href={social.href}
                  isExternal
                  display="flex"
                  flexDirection="row"
                  width="full"
                >
                  <HoverLink
                    id="social_links"
                    isHovered={isHovered(social.name)}
                  />
                  <Flex alignItems="center" gap="2">
                    <LazyImage
                      boxProps={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 'none',
                        mt: '1',
                        width: '40px',
                        height: '40px',
                        shadow: 'md',
                        rounded: 'full',
                        border: '1px solid',
                        borderColor: mode('slate.100', 'primaryAlpha.700'),
                      }}
                      imgProps={{
                        img_name: social.image,
                        width: '28px',
                        height: '28px',
                        alt: social.name,
                      }}
                    />
                    <Box p="2">
                      <ProseHeadings component="h4">
                        {social.name}
                      </ProseHeadings>
                    </Box>
                  </Flex>
                  <Spacer />
                  <Flex alignItems="center" p="2">
                    <Tag colorScheme="slate">Follow</Tag>
                  </Flex>
                </LinkOverlay>
              </LinkBox>
            ))}
          </Wrap>
        </CardBody>
      </Card>
    </Flex>
  );
};
export default SocialSidebar;
