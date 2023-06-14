import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useDeferredValue,
  useRef,
  useTransition,
} from 'react';
import { createStore, useStore } from 'zustand';

import { usePageProps } from '@/Hooks/useTypedPage';

type SelectProps = {
  id: string;
  label: string;
};

interface MenuSelectProps {
  select: Array<SelectProps>;
  selected: string;
}

interface MenuAction extends MenuSelectProps {
  setSelected: (payload: string) => void;
  getSelected: (payload: MenuSelectProps['select']) => SelectProps | undefined;
}

type SelectedProps<T> = {
  [x: MenuAction['selected']]: T;
};

type MenuStore = ReturnType<typeof createMenuStore>;

const createMenuStore = (initProps?: Partial<MenuSelectProps>) => {
  const DEFAULT_PROPS: MenuSelectProps = {
    select: [],
    selected: '',
  };
  return createStore<MenuAction>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setSelected: (payload) => {
      router.reload({
        only: [payload],
        onSuccess: () => {
          set(() => ({ selected: payload }));
        },
      });
    },
    getSelected: (payload) => {
      const selected = get().selected;
      return payload.find((element) => element.id === selected);
    },
  }));
};

export const MenuSelectContext = createContext<MenuStore | null>(null);

type MenuSelectProviderProps = PropsWithChildren<MenuSelectProps>;

export function MenuSelectProvider({
  children,
  ...props
}: MenuSelectProviderProps) {
  const storeRef = useRef<MenuStore>();
  if (!storeRef.current) {
    storeRef.current = createMenuStore(props);
  }
  return (
    <MenuSelectContext.Provider value={storeRef.current}>
      {children}
    </MenuSelectContext.Provider>
  );
}

export function useMenuSelectContext<T>(
  selector: (state: MenuAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(MenuSelectContext);
  if (!store) throw new Error('Missing MenuSelectContext.Provider in the tree');
  return useStore(store, selector, equalityFn);
}

export function useSelectedValues<T>() {
  const selected = useMenuSelectContext((state) => state.selected);
  const values = usePageProps<SelectedProps<T>>()[selected];
  const initial = useDeferredValue(values);

  return initial;
}

export function MenuSelect() {
  const select = useMenuSelectContext((state) => state.select);
  const [isPending, startTransition] = useTransition();
  const setSelected = useMenuSelectContext((state) => state.setSelected);
  const getSelected = useMenuSelectContext((state) => state.getSelected);
  const current = getSelected(select);
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        colorScheme={'emerald'}
        rightIcon={<ChevronDownIcon />}
        isLoading={isPending}
      >
        {isPending ? 'Pending' : current?.label}
      </MenuButton>
      <Portal>
        <MenuList py="1" maxHeight={'50vh'} overflowY={'auto'}>
          {select.map((page) => (
            <MenuItem
              color={mode('slate.700', 'slate.300')}
              fontSize={'md'}
              key={page.id}
              onClick={() => {
                startTransition(() => {
                  setSelected(page.id);
                });
              }}
            >
              {page.label}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
}
