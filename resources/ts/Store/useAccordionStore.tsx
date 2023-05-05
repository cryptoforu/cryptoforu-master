import { create } from 'zustand';

interface AccordionStore {
  accIndex: number;
  itemsId: number;
  setAccordion: (id: number) => void;
  accordionActive: (id: number) => boolean;
  setItemActive: (id: number) => void;
}

const useAccordionStore = create<AccordionStore>((set, get) => ({
  accIndex: 0,
  itemsId: 0,
  setAccordion: (id) =>
    set((state) => ({ accIndex: state.accIndex === id ? undefined : id })),
  accordionActive: (id) => {
    const isActive = get().accIndex === id;
    return isActive;
  },
  setItemActive: (id) => set(() => ({ itemsId: id })),
}));

export const useAccordionState = () =>
  useAccordionStore((state) => state.accIndex);
export const useAccordionAction = () =>
  useAccordionStore((state) => state.setAccordion);
export const isActive = (id: number) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAccordionStore((state) => state.accordionActive(id));
export const useActiveItem = () =>
  useAccordionStore((state) => state.setItemActive);
export const useItemState = () => useAccordionStore((state) => state.itemsId);

export default useAccordionStore;
