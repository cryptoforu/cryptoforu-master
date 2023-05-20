import { Container, Box, Flex, Spacer, SimpleGrid } from '@chakra-ui/react';
import { usePageProps } from '@/Hooks/useTypedPage';
import { PaperCard, SectionHeader } from '@/Components/Elements/Content';
import { useSectionDispatch } from '@/Providers/SectionProvider';
import { SecondaryButton } from '@/Components/Elements/Navigation';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { PatternWrapper } from '@/Components/Patterns';
import { SimpleSubscribe } from '@/Forms';
import { LatestPosts } from './';
import { ReactComponent as Hexagon } from '@/images/Hexagon.svg';
import type { CategoryData } from '@/Types/generated';

const CryptoAcademy = () => {
  const { categories } = usePageProps<CategoryData[]>();
  const { handleLoad } = useSectionDispatch();
  return (
    <>
      <PatternWrapper top="0" left="0" width="100%" height="45rem">
        <Flex maxWidth="full" align="center" justify="flex-end">
          <Hexagon />
        </Flex>
      </PatternWrapper>
      <Container
        id="crypto-academy"
        maxWidth="8xl"
        onLoad={() => handleLoad('crypto-academy')}
      >
        <Flex minWidth="full" alignItems="center" gap="2" px="8">
          <SectionHeader
            variant="base"
            maxWidth="2xl"
            position="relative"
            title="Crypto"
            gradTitle="Academy"
            desc="To take advantage of the chance to increase both your knowledge
          and your financial opportunities, start learning with us right
          away"
          />

          <Spacer />
          <SecondaryButton to="learn-crypto" mr="8" rounded="full">
            Browse all <ArrowForwardIcon />
          </SecondaryButton>
        </Flex>
        <SimpleGrid
          minWidth="full"
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          mt="8"
          px="8"
        >
          {Object.values(categories).map((category) => (
            <PaperCard
              key={category.id}
              title={category.name}
              badgeColor={category.color}
              description={category.description as string}
              bgImage={category.category_image}
              slug={category.slug as string}
            />
          ))}
        </SimpleGrid>
        <Box py="24">
          <Box
            maxW={{ base: 'xl', md: '2xl', lg: '7xl' }}
            mx="auto"
            px={{ base: '6', md: '8' }}
          >
            <SectionHeader
              variant="large"
              textAlign="center"
              badgeLabel="Blog"
              title="Latest Blog"
              gradTitle="Posts"
              desc=" With Cryptoforu, you can be sure that you are getting access to
          the best and most reliable resources for building your
          portofolio. So why wait? Subscribe today"
            />

            <Box mt="8" maxWidth="2xl" mx="auto">
              <SimpleSubscribe />
            </Box>
          </Box>
          <LatestPosts />
        </Box>
      </Container>
    </>
  );
};

export default CryptoAcademy;
