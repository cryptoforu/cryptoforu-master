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
                top="-64"
                right="-64"
                width={530}
                height={530}
                opacity={0.5}
              >
                <ResponsiveImage
                  img_name="6456cef48ea15.webp"
                  loading="eager"
                  query={{
                    sm: 300,
                    md: 600,
                    lg: 1132,
                  }}
                  alt=""
                />
              </Box>
              <Box
                position="absolute"
                bottom="-40"
                right="-44"
                width={530}
                height={530}
                opacity={0.5}
              >
                <ResponsiveImage
                  img_name="6456ab874ce73.png"
                  loading="eager"
                  query={{
                    sm: 300,
                    md: 600,
                    lg: 1132,
                  }}
                  alt=""
                />
              </Box>
              <Box
                position="absolute"
                inset="0"
                rounded="2xl"
                bgGradient="linear(to-tr, #7dd3fc, rgba(125, 211, 252, 0.7), blue.300)"
                opacity="0.1"
                filter="auto"
                blur="16px"
              />
              <Box
                position="absolute"
                inset="0"
                rounded="2xl"
                bgGradient="linear(to-tr, #7dd3fc, rgba(125, 211, 252, 0.7), blue.300)"
                opacity="0.1"
              />
              <Box
                position="relative"
                mx="auto"
                h="full"
                w="full"
                maxWidth="md"
                backdropFilter="auto"
                backdropBlur="8px"
              >
                <Box
                  position="absolute"
                  top="-1"
                  left="20"
                  right="11"
                  height="1px"
                  bgGradient="linear(to-r, rgba(110, 231, 183, 0), rgba(110, 231, 183, 0.7), rgba(110, 231, 183, 0))"
                />
                <Box
                  position="absolute"
                  bottom="-1"
                  left="11"
                  right="20"
                  height="1px"
                  bgGradient="linear(to-r, rgba(110, 231, 183, 0), rgba(110, 231, 183, 0.7), rgba(110, 231, 183, 0))"
                />
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
