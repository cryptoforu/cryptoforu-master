import { forwardRef } from 'react';
import {
  Avatar,
  Center,
  CenterProps,
  Box,
  Button,
  ButtonProps,
} from '@chakra-ui/react';

interface AvatarButtonProps extends ButtonProps {
  avatar: string | undefined;
  name?: string;
  label?: string;
  notify?: string;
}

const NotificationBadge = (props: CenterProps) => (
  <Center
    bg="red.500"
    fontSize="xs"
    fontWeight="bold"
    position="absolute"
    rounded="full"
    textAlign="center"
    top="-2px"
    right="-2px"
    w="16px"
    h="16px"
    {...props}
  />
);

const AvatarButton = forwardRef(function AvatarButton(
  { avatar, name, label, notify, ...props }: AvatarButtonProps,
  ref
) {
  return (
    <Button ref={ref} px="2" outline="0" variant="unstyled" {...props}>
      <Box srOnly>{label}</Box>
      <Avatar
        position={notify ? 'relative' : undefined}
        w="8"
        h="8"
        src={avatar}
        name={name}
      />
      {notify && <NotificationBadge>{notify}</NotificationBadge>}
    </Button>
  );
});

export default AvatarButton;
