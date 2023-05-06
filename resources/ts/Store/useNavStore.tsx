import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { immer } from 'zustand/middleware/immer';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { MenuItems } from '@/Types/generated';

type NavState = {
  scrolled: boolean;
  subId: number;
};

type NavActions = {
  setScrolled: (action: boolean) => void;
  setSubId: (id: number) => void;
  onSubClose: () => void;
  subOpen: (id: number) => boolean;
};

interface NavStore extends NavState, NavActions {}

const useNavStore = create<NavStore>()(
  immer((set, get) => ({
    scrolled: false,
    subId: 0,
    subOpen: (id) => {
      const isOpen = get().subId === id;
      return isOpen;
    },
    setScrolled: (action) => set(() => ({ scrolled: action })),
    setSubId: (id) =>
      set((state) => {
        state.subId = id;
      }),
    onSubClose: () =>
      set((state) => {
        state.subId = 0;
      }),
  }))
);

export const useScrolled = () => {
  const [scrolled, setScrolled] = useNavStore(
    (state) => [state.scrolled, state.setScrolled],
    shallow
  );

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 0);
  });

  return scrolled;
};

export const useNavigation = () => {
  const { subOpen, setSubId, onSubClose, subId } = useNavStore(
    (state) => ({
      subOpen: state.subOpen,
      setSubId: state.setSubId,
      onSubClose: state.onSubClose,
      subId: state.subId,
    }),
    shallow
  );
  const { main_menu } = usePageProps<MenuItems[]>();
  return {
    subOpen,
    main_menu,
    setSubId,
    onSubClose,
    subId,
  };
};
