import { Td, Flex, Icon } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ProsePa } from '@/Components/Elements/Typography';
import { Method } from '@inertiajs/core';
import { Button } from '@chakra-ui/react';
import { BtnLink } from '@/Components/Elements/Navigation';
type ActionProps = {
  action: 'edit' | 'delete' | 'state';
  href?: string;
  method?: Method;
  setState?: (state: unknown) => void;
  isPending?: boolean;
};

const ActionCell = (props: ActionProps) => {
  const { action, href, method, setState, isPending } = props;
  switch (action) {
    case 'edit': {
      return (
        <Td>
          <BtnLink
            to={href as string}
            options={{
              method: method,
            }}
            aria-label="action cell"
            colorScheme="emerald"
            variant="ghost"
            size="sm"
          >
            <Flex cursor="pointer" align="center">
              <Icon as={EditIcon} color="emerald.500" me="4px" />
              <ProsePa>Edit</ProsePa>
            </Flex>
          </BtnLink>
        </Td>
      );
    }
    case 'delete': {
      return (
        <Td>
          <BtnLink
            to={href as string}
            options={{
              method: method,
            }}
            aria-label="action cell"
            colorScheme="red"
            variant="ghost"
            size="sm"
          >
            <Flex cursor="pointer" align="center">
              <Icon as={DeleteIcon} color="red.500" me="4px" />
              <ProsePa>Delete</ProsePa>
            </Flex>
          </BtnLink>
        </Td>
      );
    }
    case 'state': {
      return (
        <Td>
          <Button
            onClick={setState}
            colorScheme="emerald"
            variant="ghost"
            size="sm"
            isLoading={isPending}
          >
            <Flex cursor="pointer" align="center">
              <Icon as={EditIcon} color="emerald.500" me="4px" />
              <ProsePa>Edit</ProsePa>
            </Flex>
          </Button>
        </Td>
      );
    }
  }
};

export default ActionCell;
