import type { As } from '@chakra-ui/react';
import { Box, Icon, Text, useColorModeValue as mode } from '@chakra-ui/react';

type TabButtonProps = {
  icon: As;
  title: string;
  desc: string;
};

const TabButton = ({ icon, title, desc }: TabButtonProps) => {
  return (
    <>
      <Icon as={icon} w="5" h="5" />
      <Box ml="6">
        <Text>{title}</Text>
        <Text
          display={{ base: 'none', xl: 'flex' }}
          fontWeight={'light'}
          color={mode('slate.600', 'slate.400')}
        >
          {desc}
        </Text>
      </Box>
    </>
  );
};

export default TabButton;
