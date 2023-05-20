import {
  Box,
  Container,
  Button,
  Grid,
  GridItem,
  Stack,
  Divider,
  Link,
} from '@chakra-ui/react';
import { SimpleSubscribe } from '@/Forms';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import { Logo } from '../Elements/Content';
import { LazyImage } from '../Elements/Content';
import { NavLink } from '../Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { SocialLinks } from '@/Sections/home-types';
const Footer = () => {
  const { social } = usePageProps<SocialLinks[]>();
  return (
    <Box
      as="footer"
      position="relative"
      isolation="isolate"
      overflow="hidden"
      mt="24"
    >
      <Container
        maxWidth={{ base: '5xl', lg: '8xl' }}
        px={{ base: '4', lg: '12' }}
      >
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          maxWidth={{ base: '2xl', lg: 'none' }}
          rowGap={16}
          columnGap={8}
          py={{ base: '12', md: '16' }}
        >
          <GridItem>
            <Stack spacing={{ base: '6', md: '8' }} align="start">
              <Box width="250px" height="auto">
                <Logo
                  lazy={false}
                  alt="Cryptoforu Learn and earn Crypto"
                  variant="navLogo"
                />
              </Box>
              <ProsePa>Learn and Earn Crypto</ProsePa>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <ProsePa fontSize="sm" fontWeight="semibold" color="subtle">
                  Links
                </ProsePa>
                <Stack spacing="3" shouldWrapChildren>
                  <NavLink
                    to="learn-crypto"
                    size="xs"
                    letterSpacing="-0.025em"
                    fontWeight="bold"
                  >
                    Learn Crypto
                  </NavLink>
                  <NavLink
                    to="earn-crypto"
                    size="xs"
                    letterSpacing="-0.025em"
                    fontWeight="bold"
                  >
                    Earn Crypto
                  </NavLink>
                  <NavLink
                    to="contact"
                    size="xs"
                    letterSpacing="-0.025em"
                    fontWeight="bold"
                  >
                    Contact Us
                  </NavLink>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <ProsePa fontSize="sm" fontWeight="semibold" color="subtle">
                  Legal
                </ProsePa>
                <Stack spacing="3" shouldWrapChildren>
                  <Button variant="link">Privacy</Button>
                  <Button variant="link">Terms</Button>
                  <Button variant="link">License</Button>
                </Stack>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem maxWidth={{ base: 'xl', lg: 'lg' }}>
            <ProseHeadings component="h3" size="xl">
              Subscribe to our newsletter.
            </ProseHeadings>
            <ProsePa mt="4">
              Keep up with the latest cryptocurrency news, announcements, and
              exclusive guides.
            </ProsePa>
            <Box mt="4">
              <SimpleSubscribe />
            </Box>
          </GridItem>
        </Grid>
        <Divider />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <ProsePa>
            &copy; {new Date().getFullYear()} Cryptoforu, Inc. All rights
            reserved.
          </ProsePa>
          <Stack direction="row" spacing={2}>
            {social.map((link) => (
              <Link key={link.name} href={link.href} isExternal>
                <LazyImage
                  boxProps={{
                    width: '28px',
                    height: '28px',
                  }}
                  imgProps={{
                    img_name: link.image,
                    htmlHeight: '28px',
                    htmlWidth: '28px',
                  }}
                />
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Box
        position="absolute"
        top={{ base: '0', xl: '-6' }}
        left="50%"
        zIndex={-10}
        height="42.375rem"
        translateX="-50%"
        filter="auto"
        blur="3xl"
      >
        <Box
          sx={{
            aspectRatio: '1155/678',
            width: '72.1875rem',
            bgGradient: 'linear(to-tr, emerald.400, emerald.500)',
            opacity: 0.3,
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </Box>
    </Box>
  );
};
export default Footer;
