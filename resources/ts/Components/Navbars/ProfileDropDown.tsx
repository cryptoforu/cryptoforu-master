import {
  Avatar,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { useRoute } from '@/Providers/RouteProvider';
import type { InertiaSharedProps } from '@/types';

const UserAvatar = () => (
  <Avatar w="8" h="8" src="/api/img/cache/original/male_user.svg" name="User" />
);

type Props = {
  auth: InertiaSharedProps['auth'];
};
const ProfileDropDown = ({ auth }: Props) => {
  const { route, navigate, isPending } = useRoute();
  const { user } = auth;

  return (
    <Menu>
      <MenuButton
        as={Button}
        px="2"
        outline="0"
        variant="ghost"
        _active={{ shadow: 'outline' }}
      >
        <UserAvatar />
      </MenuButton>
      <Portal>
        <MenuList
          rounded="md"
          shadow="lg"
          py="1"
          color={mode('gray.600', 'inherit')}
          fontSize="sm"
        >
          <HStack px="3" py="4">
            <UserAvatar />
            <Box lineHeight="1">
              <Text fontWeight="semibold">{user?.name}</Text>
              <Text mt="1" fontSize="xs" color="gray.500">
                {user?.email}
              </Text>
            </Box>
          </HStack>
          <MenuItem
            isDisabled={isPending}
            _hover={{ bg: mode('emerald.50', 'slate.800') }}
            fontWeight="medium"
            onClick={() => navigate(route('admin:profile'))}
          >
            Your Profile
          </MenuItem>
          <MenuItem fontWeight="medium">Feedback & Support</MenuItem>
          <MenuItem fontWeight="medium">Account Settings</MenuItem>
          <MenuItem
            onClick={() =>
              navigate(
                route('logout'),
                {},
                {
                  method: 'post',
                }
              )
            }
            fontWeight="medium"
            color={mode('red.500', 'red.300')}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default ProfileDropDown;
