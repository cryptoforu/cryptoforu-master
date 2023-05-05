import { useEffect } from 'react';
import { useAnimate, stagger } from 'framer-motion';
import { MenuItems } from '@/Types/generated';
import { Wrap, WrapItem, useColorModeValue } from '@chakra-ui/react';
import { SidebarLink } from './';
import useAdminLayout, { usePopoverState } from '@/Store/useAdminLayout';
const staggerMenuItems = stagger(0.1, { startDelay: 0.5 });

const useDropAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    scope.current &&
      animate(
        scope.current,
        isOpen
          ? {
              height: 'auto',
              opacity: 1,
              scale: 1,
            }
          : {
              height: '0',
              opacity: 0,
              scale: 0.8,
            },
        {
          type: 'spring',
          bounce: 0,
          duration: 0.8,
          ease: [0.04, 0.62, 0.23, 0.98],
        }
      );
    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [animate, isOpen, scope]);

  return scope;
};

interface SidebarDropProps {
  menu: MenuItems;
}

const SidebarDropDown = ({ menu }: SidebarDropProps) => {
  const { popoverOpen } = usePopoverState();
  const { widthState } = useAdminLayout();
  const isOpen = popoverOpen(menu.id as string | number);
  const scope = useDropAnimation({ isOpen: isOpen });
  const bg = useColorModeValue('slate.100', 'blackAlpha.300');
  return (
    <Wrap
      ref={scope}
      direction="column"
      p={widthState ? '' : '2'}
      display="flex"
      bg={bg}
      rounded="md"
      justifyContent="center"
    >
      {menu.childs?.map((child) => (
        <WrapItem key={child.id} justifyContent="center">
          <SidebarLink
            to={child.route as string}
            icon={child.icon}
            label={child.label}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};
export default SidebarDropDown;
