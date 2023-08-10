import { Button, Link, Td } from '@chakra-ui/react';

const LinkCell = (label: string, href: string) => {
  return (
    <Td>
      <Button
        as={Link}
        isExternal={true}
        href={href}
        colorScheme={'emerald'}
        size={'sm'}
      >
        {label}
      </Button>
    </Td>
  );
};
export default LinkCell;
