import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useTransition } from 'react';

import { usePageForm } from '@/Store/usePageSettings';
import type { Settings } from '@/types';

const PageSelect = ({ admin, front }: Settings['select']) => {
  const [isPending, startTransition] = useTransition();
  const { label, setPage } = usePageForm();

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        colorScheme={'emerald'}
        rightIcon={<ChevronDownIcon />}
        isLoading={isPending}
      >
        {isPending ? 'Pending' : label}
      </MenuButton>
      <Portal>
        <MenuList py="1" maxHeight={'50vh'} overflowY={'auto'}>
          <MenuGroup title="Admin Pages" fontSize={'lg'}>
            {admin.map((page) => (
              <MenuItem
                color={mode('slate.700', 'slate.300')}
                fontSize={'md'}
                key={page.id}
                onClick={() => {
                  startTransition(() => {
                    setPage(page.id as string);
                  });
                }}
              >
                {page.label}
              </MenuItem>
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Front Pages" fontSize={'lg'}>
            {front.map((page) => (
              <MenuItem
                color={mode('slate.700', 'slate.300')}
                fontSize={'md'}
                key={page.id}
                onClick={() => {
                  startTransition(() => {
                    setPage(page.id as string);
                  });
                }}
              >
                {page.label}
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default PageSelect;
