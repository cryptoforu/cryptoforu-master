import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Text,
  useColorModeValue as mode,
  Portal,
  Button,
} from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { useRoute } from '@/Providers/RouteProvider';
import type { InertiaSharedProps } from '@/types';
const UserAvatar = () => (
  <Avatar w="8" h="8" src="/img/cache/original/male_user.svg" name="User" />
);

type Props = {
  auth: InertiaSharedProps['auth'];
};
const ProfileDropDown = ({ auth }: Props) => {
  const { route } = useRoute();
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
          <MenuItem fontWeight="medium">Your Profile</MenuItem>
          <MenuItem fontWeight="medium">Feedback & Support</MenuItem>
          <MenuItem fontWeight="medium">Account Settings</MenuItem>
          <MenuItem
            onClick={() => router.post(route('logout'))}
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
