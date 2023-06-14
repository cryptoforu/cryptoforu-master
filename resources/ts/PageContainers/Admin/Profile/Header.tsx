import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  CubeTransparentIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

import { useTabs } from '@/Store/useTabs';

type HeaderProps = {
  backgroundProfile: string;
  avatarImage: string;
  name?: string;
  email?: string;
};

const tabs = [
  {
    name: 'Overview',
    icon: CubeTransparentIcon,
  },
  {
    name: 'Password Reset',
    icon: RectangleStackIcon,
  },
];

const ProfileHeader = ({
  backgroundProfile,
  avatarImage,
  name,
  email,
}: HeaderProps) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderProfileColor = useColorModeValue('white', 'rgba(0, 4, 15, 0.95)');
  const emailColor = useColorModeValue('gray.400', 'gray.300');
  const { getSelected, onKeyChange, isPending } = useTabs();
  return (
    <Box
      mb={{ sm: '205px', md: '75px', xl: '70px' }}
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="100%"
        borderRadius="25px"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          mx="1.5rem"
          maxH="330px"
          w={{ sm: '90%', xl: '95%' }}
          justifyContent={{ sm: 'center', md: 'space-between' }}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={borderProfileColor}
          bg={backgroundProfile}
          p="24px"
          borderRadius="20px"
        >
          <Flex
            align="center"
            mb={{ sm: '10px', md: '0px' }}
            direction={{ sm: 'column', md: 'row' }}
            w={{ sm: '100%' }}
            textAlign={{ sm: 'center', md: 'start' }}
          >
            <Avatar
              me={{ md: '22px' }}
              src={avatarImage}
              w="80px"
              h="80px"
              borderRadius="15px"
            />
            <Flex direction="column" maxWidth="100%" my={{ sm: '14px' }}>
              <Text
                fontSize={{ sm: 'lg', lg: 'xl' }}
                color={textColor}
                fontWeight="bold"
                ms={{ sm: '8px', md: '0px' }}
              >
                {name}
              </Text>
              <Text
                fontSize={{ sm: 'sm', md: 'md' }}
                color={emailColor}
                fontWeight="semibold"
              >
                {email}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: 'column', lg: 'row' }}
            w={{ sm: '100%', md: '50%', lg: 'auto' }}
            gap={'6'}
          >
            {tabs.map((tab, tabIndex) => (
              <Button
                key={tabIndex}
                onClick={() => onKeyChange(tabIndex)}
                isLoading={isPending}
                loadingText={'Loading'}
                variant={getSelected(tabIndex) ? 'solid' : 'outline'}
                colorScheme={getSelected(tabIndex) ? 'emerald' : 'gray'}
                leftIcon={<Icon as={tab.icon} />}
              >
                {tab.name}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
export default ProfileHeader;
