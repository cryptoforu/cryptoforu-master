import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Fragment, useTransition } from 'react';

import { ButtonLink } from '@/Components/Elements/Navigation';
import { ProseHeadings } from '@/Components/Elements/Typography';
import { useMenuContent } from '@/Store/useMenuContent';

import SettingsContent, {
  SettingsBody,
  SettingsRow,
  SettingsRowBody,
} from '../SettingsContent';
import EditMenu from './EditMenu';
import PageHeader from './PageHeader';

function MenuHeader() {
  const [isPending, startTransition] = useTransition();
  const { currentValues, setActiveId, values } = useMenuContent();
  return (
    <PageHeader title="App Menu Data">
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          variant="primaryBtn"
          rightIcon={<ChevronDownIcon />}
          isLoading={isPending}
        >
          {isPending ? 'Pending' : currentValues?.label}
        </MenuButton>
        <Portal>
          <MenuList>
            {values.map((menu) => (
              <MenuItem
                color={mode('slate.700', 'slate.300')}
                fontSize={'md'}
                key={menu.id}
                onClick={() => {
                  startTransition(() => {
                    setActiveId(menu.id);
                  });
                }}
              >
                {menu.label}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </PageHeader>
  );
}

function Delete({ id }: { id: number }) {
  return (
    <Box position="absolute" right="2" top="-2" py="4">
      <ButtonLink
        as={IconButton}
        icon={<DeleteIcon />}
        size="sm"
        colorScheme="red"
        to="admin:settings:destroy"
        params={id}
        options={{
          method: 'delete',
          data: { delete: 'delete_menu' },
          preserveScroll: true,
          preserveState: true,
        }}
      />
    </Box>
  );
}

const MenuContent = () => {
  const { currentValues } = useMenuContent();
  return (
    <SettingsContent>
      <MenuHeader />
      <SettingsBody>
        {currentValues?.items?.map((child, childIndex) => (
          <Fragment key={child.id}>
            <SettingsRowBody key={child.label} position="relative">
              <Delete id={child.id as number} />
              <SettingsRow>
                <ProseHeadings component="h3"> Label </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.label`}
                  id={child.id?.toString()}
                  name="label"
                  defaultValue={child.label}
                />
              </SettingsRow>
              <SettingsRow>
                <ProseHeadings component="h3"> Icon </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.icon`}
                  id={child.id?.toString()}
                  name="icon"
                  defaultValue={child.icon}
                />
              </SettingsRow>
              <SettingsRow>
                <ProseHeadings component="h3"> Route </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.route`}
                  id={child.id?.toString()}
                  name="route"
                  defaultValue={child.route}
                />
              </SettingsRow>
            </SettingsRowBody>
          </Fragment>
        ))}
      </SettingsBody>
    </SettingsContent>
  );
};
export default MenuContent;
