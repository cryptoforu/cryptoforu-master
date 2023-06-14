// Chakra imports
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { LazyImage } from '@/Components/Elements/Content';
import type { SocialLinks } from '@/types';

type ProfileInfo = {
  title: string;
  name?: string;
  mobile?: number;
  email?: string;
  location?: string;
  social: SocialLinks[];
};

const ProfileInformation = ({
  title,
  name,
  mobile,
  email,
  location,
  social,
}: ProfileInfo) => {
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card p="16px" my={{ sm: '24px', xl: '0px' }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Flex direction="column">
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Full Name:{' '}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {name}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mobile:{' '}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {mobile}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{' '}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {email}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Location:{' '}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {location}
            </Text>
          </Flex>
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Social Media:{' '}
            </Text>
            <Flex>
              {social.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target={'_blank'}
                  color="teal.300"
                  fontSize="lg"
                  me="10px"
                  _hover={{ color: 'teal.300' }}
                >
                  <LazyImage
                    imgProps={{
                      img_name: s.image,
                      alt: s.name,
                    }}
                    boxProps={{
                      width: '48px',
                      height: '48px',
                    }}
                  />
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
