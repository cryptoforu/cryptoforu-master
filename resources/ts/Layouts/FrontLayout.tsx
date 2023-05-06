import { PropsWithChildren } from 'react';
import AppHead from '@/Components/AppHead';
import {
  Flex,
  useMultiStyleConfig,
  ThemingProps,
  HTMLChakraProps,
} from '@chakra-ui/react';
import { MainNav } from '@/Components/Navbars';
export interface FrontLayoutProps
  extends ThemingProps,
    HTMLChakraProps<'div'>,
    PropsWithChildren {}

const FrontLayout = ({ children, ...props }: FrontLayoutProps) => {
  const { size, ...rest } = props;
  const styles = useMultiStyleConfig('FrontLayout', { size });
  return (
    <>
      <AppHead />
      <MainNav />
      <Flex as="main" role="main" __css={styles.main} {...rest}>
        {children}
      </Flex>
    </>
  );
};

export default FrontLayout;
