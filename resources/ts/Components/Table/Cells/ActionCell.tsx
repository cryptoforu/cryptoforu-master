import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Td } from '@chakra-ui/react';
import { Method } from '@inertiajs/core';

import { ButtonLink } from '@/Components/Elements/Navigation';

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
          <ButtonLink
            to={href as string}
            options={{
              method: method,
            }}
            aria-label="action cell"
            colorScheme="emerald"
            variant="ghost"
            size="sm"
            leftIcon={<EditIcon />}
          >
            Edit
          </ButtonLink>
        </Td>
      );
    }
    case 'delete': {
      return (
        <Td>
          <ButtonLink
            to={href as string}
            options={{
              method: method,
            }}
            aria-label="action cell"
            colorScheme="red"
            size="sm"
            leftIcon={<DeleteIcon />}
          >
            Delete
          </ButtonLink>
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
            leftIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Td>
      );
    }
  }
};

export default ActionCell;
