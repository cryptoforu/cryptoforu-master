import {
  IconButton,
  Icon,
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { usePageProps } from '@/Hooks/useTypedPage';
import { Separator } from '@/Components/Elements/Content';
import useAdminLayout, { usePopoverState } from '@/Store/useAdminLayout';
import { Logo } from '@/Components/Elements/Content';
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline/index.js';
import { m } from 'framer-motion';
import type { MenuItems } from '@/Types/generated';
import { NavLink, BtnLink } from '../Elements/Navigation';
import { SidebarLink, SidebarLabel, SidebarDropDown } from './';

const MainSidebar = () => {
  const { admin_sidebar } = usePageProps<MenuItems[]>();
  const { widthState, toogleSidebar } = useAdminLayout();
  const { onPopOpen } = usePopoverState();
  const footerColor = useColorModeValue('gray.100', 'gray.900');
  const mainColor = useColorModeValue('slate.100', 'slate.900');
  const borderColor = useColorModeValue('slate.50', 'slate.800');
  return (
    <Flex
      as="aside"
      position="fixed"
      insetY={0}
      zIndex={10}
      overflow={'hidden'}
      bg={mainColor}
      borderRight="1px"
      borderRightColor={borderColor}
    >
      <Flex
        as={m.div}
        initial={widthState ? 'min' : 'full'}
        animate={widthState ? 'min' : 'full'}
        direction="column"
        ms={{
          sm: widthState ? '0px' : '8px',
        }}
        my={{
          sm: widthState ? '8px' : '16px',
        }}
        ps={widthState ? '4px' : '12px'}
        pe={widthState ? '4px' : '12px'}
        maxWidth="256px"
      >
        <Flex
          align="center"
          justify="space-between"
          gap={widthState ? '2' : '6'}
          direction={widthState ? 'column' : 'row'}
          pt="12px"
          mb="12px"
        >
          <NavLink to="/" order={widthState ? 2 : 1}>
            <Logo
              alt="Cryptoforu"
              lazy={false}
              variant={widthState ? 'baseLogo' : 'navLogo'}
            />
          </NavLink>
          <IconButton
            as={m.button}
            whileTap={{ scale: 1.1 }}
            whileFocus={{ outlineWidth: '1px', outlineColor: '#34d399' }}
            order={widthState ? 1 : 2}
            size={'sm'}
            aria-label="switch sidebar"
            icon={
              <Icon
                as={widthState ? ArrowsPointingInIcon : ArrowsPointingOutIcon}
              />
            }
            onClick={toogleSidebar}
          />
        </Flex>
        <Separator />
        <Stack
          direction="column"
          justify={widthState ? 'center' : ''}
          mt="12px"
        >
          <Box mx={widthState ? '4px' : ''}>
            {admin_sidebar.map((menu, menuIndex) =>
              menu?.childs?.length === 0 ? (
                <SidebarLink
                  key={menu.label}
                  to={menu.route as string}
                  icon={menu.icon}
                  label={menu.label}
                />
              ) : (
                <Box key={menuIndex}>
                  {menuIndex !== 1 && <Separator />}
                  <SidebarLabel
                    label={menu.label as string}
                    onTap={() => onPopOpen(menu?.id as string | number)}
                    icon={menu.icon}
                  >
                    <ChevronDownIcon />
                  </SidebarLabel>
                  <SidebarDropDown menu={menu} />
                </Box>
              )
            )}
          </Box>
        </Stack>

        <Flex
          position="absolute"
          bottom={0}
          insetX={0}
          p="6"
          align="center"
          justify="center"
          bg={footerColor}
        >
          <BtnLink
            colorScheme="emerald"
            to="logout"
            options={{
              method: 'post',
            }}
          >
            {!widthState ? (
              <Text>Logout</Text>
            ) : (
              <Icon as={ArrowLeftOnRectangleIcon} />
            )}
          </BtnLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MainSidebar;
