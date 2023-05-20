import {
  ThemingProps,
  HTMLChakraProps,
  useStyleConfig,
  forwardRef,
  Box,
  Flex,
  Spacer,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { useScrolled } from '@/Store/useNavStore';
import { Logo } from '../Elements/Content';
import ThemeSwitcher from './ThemeSwitcher';
import { PrimaryButton } from '../Elements/Navigation';
import { Link } from '@inertiajs/react';
import MainNavigation from './MainNavigation';
export interface MainNavProps extends ThemingProps, HTMLChakraProps<'header'> {}

const Nav = forwardRef<MainNavProps, 'header'>(function Nav(props, ref) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig('MainNav', { variant, size });
  return <Box ref={ref} __css={styles} {...rest} />;
});

const MainNav = () => {
  const scrolled = useScrolled();
  return (
    <Nav variant={scrolled ? 'scrolled' : 'notScrolled'}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p="4"
        px={{ lg: '8' }}
      >
        <LinkBox
          display="flex"
          alignItems="center"
          flex={{ lg: '1' }}
          maxWidth="80px"
        >
          <LinkOverlay as={Link} href="/" m="-1.5">
            <Box srOnly>Cryptoforu Home Page</Box>
            <Logo
              variant="navLogo"
              alt="Cryptoforu Learn and  Earn Crypto"
              lazy={false}
              width="80px"
              height="auto"
            />
          </LinkOverlay>
        </LinkBox>
        <Spacer />
        <MainNavigation />
        <Flex flex="1" align="center" justify="flex-end" gap="2">
          <ThemeSwitcher />
          <PrimaryButton to="login" size="sm">
            Login
          </PrimaryButton>
        </Flex>
      </Flex>
    </Nav>
  );
};
export default MainNav;
