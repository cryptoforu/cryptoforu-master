import { Container, Flex, SimpleGrid, Box } from '@chakra-ui/react';
import { ArticleCard } from '@/Components/Elements/Content';
import { SocialSidebar } from './';
import { usePageProps } from '@/Hooks/useTypedPage';
import { v4 as uuidv4 } from 'uuid';
import { ResponsiveImage } from '@/Components/Elements/Content';
import type { PostData } from '@/Types/generated';
const LatestPosts = () => {
  const { posts } = usePageProps<PostData[]>();
  return (
    <Container maxWidth="8xl" mt="24" position="relative">
      <Box position="absolute" inset="0">
        <ResponsiveImage
          img_name="6456cef565b01.png"
          loading="eager"
          query={{
            sm: 600,
            md: 1200,
            lg: 2300,
          }}
          filter="auto"
          blur="8px"
          opacity={0.5}
          brightness="40%"
          alt=""
        />
      </Box>
      <SimpleGrid
        minWidth="full"
        columns={{ base: 1, lg: 2 }}
        spacing={8}
        mt="8"
        px="8"
      >
        <Flex direction="column" gap={8}>
          {posts.map((post) => (
            <ArticleCard
              key={post.id}
              id={uuidv4()}
              title={post.title}
              category={post.category?.name as string}
              slug={post.slug as string}
              desc={post.introduction as string}
            />
          ))}
        </Flex>
        <SocialSidebar />
      </SimpleGrid>
    </Container>
  );
};
export default LatestPosts;
