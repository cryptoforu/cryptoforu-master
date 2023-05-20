import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { HeroWrapper } from '@/Components/Wrappers';
import { ResponsiveImage } from '@/Components/Elements/Content';
import { Logo } from '@/Components/Elements/Content';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import {
  PrimaryButton,
  SecondaryButton,
} from '@/Components/Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { IHomeData } from '../home-types';
const Hero = () => {
  const { hero } = usePageProps<IHomeData>().data;
  return (
    <HeroWrapper>
      <Box
        position={{ lg: 'relative' }}
        py={{ base: '16', lg: '20' }}
        px={{ base: '2', lg: '0' }}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          maxWidth={{ base: '2xl', lg: 'none' }}
          alignItems="center"
          mx="auto"
          px={{ base: '4', lg: '32px', xl: '64px' }}
          rowGap="16"
          columnGap={{ base: '32px', xl: '64px' }}
        >
          <Box
            position="relative"
            zIndex={10}
            textAlign={{ md: 'center', lg: 'left' }}
          >
            <Box
              position="absolute"
              bottom="100%"
              right="100%"
              mr="-72"
              mb="-56"
              opacity={0.5}
            >
              <ResponsiveImage
                img_name="6456ab874ce73.png"
                loading="eager"
                htmlWidth="530px"
                htmlHeight="530px"
                query={{
                  sm: 300,
                  md: 600,
                  lg: 1200,
                }}
                alt=""
              />
            </Box>
            <Box position="relative" pt="8">
              <ProseHeadings
                component="h1"
                size="xxl"
                variant="proseGradientEmerald"
              >
                {hero.title}
              </ProseHeadings>
              <ProsePa>{hero.description}</ProsePa>
              <Flex
                mt="8"
                gap="4"
                position="relative"
                justify={{ base: 'center', lg: 'start' }}
              >
                <PrimaryButton to="earn-crypto">Get Started</PrimaryButton>
                <SecondaryButton to="learn-crypto">
                  Learn Crypto
                </SecondaryButton>
              </Flex>
            </Box>
          </Box>
          <Box position={{ base: 'relative', lg: 'static' }} pl={{ xl: '10' }}>
            <Box position="relative">
              <Box
                position="absolute"
                top="-40"
                right="-64"
                width={1200}
                height={2300}
              >
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
              <Box
                position="relative"
                mx="auto"
                h="full"
                w="full"
                maxWidth="md"
                backdropBlur="8px"
              >
                <Box pl="4" pt="4">
                  <Logo
                    variant="baseLogo"
                    lazy={false}
                    alt="Cryptoforu Learn and Earn Crypto"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </HeroWrapper>
  );
};
export default Hero;
