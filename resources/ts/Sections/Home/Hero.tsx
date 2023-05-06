import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { HeroWrapper } from '@/Components/Wrappers';
import { LazyImage } from '@/Components/Elements/Content';
import { Logo } from '@/Components/Elements/Content';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import { BtnLink } from '@/Components/Elements/Navigation';
const Hero = () => {
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
              <LazyImage
                boxProps={{
                  width: '530px',
                  height: '530px',
                }}
                imgProps={{
                  loading: 'eager',
                  alt: '',
                  src: '/img/cache/original/6456ab874ce73.png',
                }}
              />
            </Box>
            <Box position="relative" pt="8">
              <ProseHeadings
                component="h1"
                size="xxl"
                variant="proseGradientEmerald"
              >
                Cryptoforu | Learn and earn Crypto
              </ProseHeadings>
              <ProsePa>
                If you are interested in making money online, then Cryptoforu is
                the right place for you. We help individuals to learn and earn
                crypto by providing them with the knowledge they need to
                succeed.
              </ProsePa>
              <Flex
                mt="8"
                gap="4"
                position="relative"
                justify={{ base: 'center', lg: 'start' }}
              >
                <BtnLink
                  as={Button}
                  variant="primaryBtn"
                  size="md"
                  to="earn-crypto"
                >
                  Get Started
                </BtnLink>
                <BtnLink as={Button} to="learn-crypto" rounded="full" size="md">
                  Learn Crypto
                </BtnLink>
              </Flex>
            </Box>
          </Box>
          <Box position={{ base: 'relative', lg: 'static' }} pl={{ xl: '10' }}>
            <Box position="relative">
              <LazyImage
                boxProps={{
                  width: '1200px',
                  height: '600px',
                  position: 'absolute',
                  top: '-64',
                  right: '-64',
                }}
                imgProps={{
                  loading: 'eager',
                  alt: '',
                  filter: 'auto',
                  blur: '8px',
                  opacity: 0.5,
                  brightness: '40%',
                  src: '/img/cache/original/6456cef565b01.png',
                }}
              />

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
