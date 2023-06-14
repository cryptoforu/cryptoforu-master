import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import useActive from '@/Hooks/useActive';
import { useWidthState } from '@/Store/useAdminLayout';

import { LazyImage } from '../Elements/Content';
import { ButtonLink } from '../Elements/Navigation';
import { ProsePa } from '../Elements/Typography';

type SidebarLinkProps = {
  to: string;
  icon?: string;
  label?: string;
};

const SidebarLink = ({ to, icon, label }: SidebarLinkProps) => {
  const isActive = useActive();
  const [scope, animate] = useAnimate();
  const widthState = useWidthState();
  const inactiveBg = useColorModeValue('white', 'gray.700');
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue('gray.400', 'gray.400');
  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: widthState ? 0 : 1,
        display: widthState ? 'none' : 'block',
      },
      { duration: 0.5, delay: widthState ? 0 : 1 }
    );
  }, [animate, scope, widthState]);

  return (
    <ButtonLink
      to={to}
      my={widthState ? '2px' : '4px'}
      bg={widthState ? 'transparent' : 'inherit'}
      justifyContent={widthState ? 'center' : ''}
      variant={isActive(to) ? 'sidebarActive' : 'sidebar'}
    >
      <Flex>
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'12px'}
          bg={isActive(to) ? 'slate.950' : inactiveBg}
          color={isActive(to) ? 'white' : 'emerald.300'}
          h="30px"
          w="30px"
          me={widthState ? '' : '12px'}
        >
          <LazyImage
            boxProps={{ maxWidth: '100%' }}
            imgProps={{ w: '24px', h: '24px', img_name: icon as string }}
          />
        </Flex>
        <ProsePa
          ref={scope}
          color={isActive(to) ? activeColor : inactiveColor}
          my="auto"
          fontSize="sm"
        >
          {label}
        </ProsePa>
      </Flex>
    </ButtonLink>
  );
};
export default SidebarLink;
