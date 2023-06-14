import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

import { usePageProps } from '@/Hooks/useTypedPage';
import { MenuData } from '@/Types/generated';

interface MenuStore {
  activeId: number;
  setActiveId: (id: number) => void;
  getActiveContent: (values: MenuData[]) => MenuData | undefined;
}

const useMenuContentStore = create<MenuStore>((set, get) => ({
  activeId: 1,
  setActiveId: (id) => set(() => ({ activeId: id })),
  getActiveContent: (values) => {
    const activeId = get().activeId;
    return values.find((element) => element.id === activeId);
  },
}));

export const useMenuContent = () => {
  const [activeId, setActiveId] = useMenuContentStore(
    (state) => [state.activeId, state.setActiveId],
    shallow
  );
  const getActiveContent = useMenuContentStore(
    (state) => state.getActiveContent
  );
  const values = usePageProps<MenuData[]>().menus;

  const currentValues = getActiveContent(values);

  return {
    currentValues,
    activeId,
    setActiveId,
    values,
  };
};
