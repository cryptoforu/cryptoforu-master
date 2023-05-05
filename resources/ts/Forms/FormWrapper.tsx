import { PropsWithChildren } from 'react';
import {
  Flex,
  Heading,
  Box,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export type FormWrapperProps = {
  title: string;
  desc: string;
};

function FormWrapper({
  children,
  title,
  desc,
}: PropsWithChildren<FormWrapperProps>) {
  return (
    <Flex
      maxW={{ base: '100%' }}
      w="100%"
      mx={{ base: 'auto', lg: '0px' }}
      px={{ base: '25px', md: '0px' }}
      direction="column"
    >
      <Box me="auto" mb="8">
        <Heading fontSize="lg" fontWeight="medium">
          {title}
        </Heading>
        <Text fontSize="sm" color={mode('slate.600', 'slate.500')}>
          {desc}
        </Text>
      </Box>
      <Box
        px={{
          base: '4',
        }}
        maxWidth="full"
      >
        {children}
      </Box>
    </Flex>
  );
}

export default FormWrapper;
