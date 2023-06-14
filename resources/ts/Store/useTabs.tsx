import { useTransition } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

type UseTabsState = {
  selected: number;
};

type UseTabsAction = {
  setSelected: (selected: number) => void;
  getSelected: (selected: number) => boolean;
};

interface UseTabsStore extends UseTabsState, UseTabsAction {}

const useTabsStore = create<UseTabsStore>()((set, get) => ({
  selected: 0,
  setSelected: (selected) => set(() => ({ selected: selected })),
  getSelected: (selected) => {
    const current = get().selected;
    return current === selected;
  },
}));

export const useTabs = () => {
  const [selected, setSelected] = useTabsStore(
    (state) => [state.selected, state.setSelected],
    shallow
  );
  const getSelected = useTabsStore((state) => state.getSelected);
  const [isPending, startTransition] = useTransition();

  function onKeyChange(action: number) {
    startTransition(() => {
      setSelected(action);
    });
  }
  return {
    getSelected,
    isPending,
    onKeyChange,
    selected,
  };
};
