import { Fragment, useTransition } from 'react';
import {
  useMultiStyleConfig,
  ThemingProps,
  HTMLChakraProps,
  Box,
  useColorModeValue as mode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Portal,
  IconButton,
} from '@chakra-ui/react';
import { BtnLink } from '@/Components/Elements/Navigation';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useMenuContent } from '@/Store/useMenuContent';
import { ProseHeadings } from '@/Components/Elements/Typography';
import EditMenu from './EditMenu';
import PageHeader from './PageHeader';
import { DeleteIcon } from '@chakra-ui/icons';
interface MenuContentProps extends ThemingProps, HTMLChakraProps<'div'> {}

function MenuHeader() {
  const [isPending, startTransition] = useTransition();
  const { currentValues, setActiveId, values } = useMenuContent();
  return (
    <PageHeader title="App Menu Data">
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          variant="gradLime"
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
      <BtnLink
        as={IconButton}
        icon={<DeleteIcon />}
        size="sm"
        colorScheme="red"
        to="admin-settings.destroy"
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

const MenuContent = ({ ...props }: MenuContentProps) => {
  const { size, variant, ...rest } = props;
  const styles = useMultiStyleConfig('SettingsContent', { size, variant });
  const { currentValues } = useMenuContent();
  return (
    <Box __css={styles.container} {...rest}>
      <MenuHeader />
      <Box __css={styles.body}>
        {currentValues?.items?.map((child, childIndex) => (
          <Fragment key={child.id}>
            <Box __css={styles.rowbody} key={child.label} position="relative">
              <Delete id={child.id as number} />
              <Box __css={styles.row}>
                <ProseHeadings component="h3"> Label </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.label`}
                  id={child.id?.toString()}
                  name="label"
                  defaultValue={child.label}
                />
              </Box>
              <Box __css={styles.row}>
                <ProseHeadings component="h3"> Icon </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.icon`}
                  id={child.id?.toString()}
                  name="icon"
                  defaultValue={child.icon}
                />
              </Box>
              <Box __css={styles.row}>
                <ProseHeadings component="h3"> Route </ProseHeadings>
                <EditMenu
                  index={`${childIndex}.route`}
                  id={child.id?.toString()}
                  name="route"
                  defaultValue={child.route}
                />
              </Box>
            </Box>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
export default MenuContent;
