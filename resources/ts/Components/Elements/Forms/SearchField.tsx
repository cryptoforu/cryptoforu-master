import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  Square,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const SearchField = (props: InputGroupProps) => {
  return (
    <InputGroup size="sm" {...props}>
      <InputLeftElement pointerEvents="none">
        <MagnifyingGlassIcon width={20} opacity={0.5} />
      </InputLeftElement>
      <InputRightElement>
        <Square
          rounded="base"
          fontSize="xs"
          borderWidth="1px"
          bg={mode('gray.100', 'gray.800')}
          color="gray.500"
        >
          /
        </Square>
      </InputRightElement>
      <Input
        rounded="md"
        placeholder="Search"
        bg={mode('emerald.50', 'gray.900')}
        _placeholder={{
          opacity: 1,
          color: mode('gray.400', 'gray.500'),
        }}
      />
    </InputGroup>
  );
};

export default SearchField;
