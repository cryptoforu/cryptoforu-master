import { useBreakpointValue } from '@chakra-ui/react';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

type WidthProps = '80px' | '256px';
type PaddingProps = '80px' | '266px';

interface AdminLayoutProps {
  widthState: boolean;
  widthSize: WidthProps;
  paddingLeft: PaddingProps;
  getStyle: () => {
    width: string;
    paddingLeft: string;
  };
  popoverId?: number | string;
  popoverOpen: (id: string | number) => boolean;
  onPopOpen: (id: string | number, index?: number) => void;
  onPopClose: () => void;
  setWidth: () => void;
  toogleSidebar: () => void;
}

const useAdminLayoutStore = create<AdminLayoutProps>((set, get) => ({
  widthState: false,
  widthSize: '256px',
  paddingLeft: '266px',
  getStyle: () => {
    const collapsed = get().widthState;
    return collapsed
      ? { width: '80px', paddingLeft: '80px' }
      : { width: '256px', paddingLeft: '266px' };
  },
  popoverId: undefined,
  popoverOpen: (id) => {
    const currentId = get().popoverId === id;
    return currentId;
  },
  onPopClose: () => set(() => ({ popoverId: 0 })),
  onPopOpen: (id) =>
    set((state) => ({
      popoverId: state.popoverId === id ? 0 : id,
    })),
  setWidth: () =>
    set((prev) => ({
      widthSize: prev.widthSize !== '256px' ? '256px' : '80px',
      paddingLeft: prev.paddingLeft !== '266px' ? '266px' : '80px',
    })),
  toogleSidebar: () => set((prev) => ({ widthState: !prev.widthState })),
}));

export function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  const display = useBreakpointValue(
    { base: 'none', md: 'block' },
    {
      fallback: 'md',
    }
  );

  const padding = useBreakpointValue({
    base: '0',
    md: isOpen ? '80px' : '266px',
  });
  useEffect(() => {
    animate(
      'aside',
      { width: isOpen ? '80px' : '256px', display: display },
      {
        ease: [0.08, 0.65, 0.53, 0.96],
        duration: 0.6,
        delay: isOpen ? 0.1 : 0.5,
      }
    );
    animate(
      'main',
      { paddingLeft: padding },
      {
        ease: [0.08, 0.65, 0.53, 0.96],
        duration: 1,
        delay: isOpen ? 0.2 : 0.3,
      }
    );
  }, [animate, display, isOpen, padding, scope]);

  return scope;
}

export const useAdminLayoutAnimation = () => {
  const [widthState, toogleSidebar] = useAdminLayoutStore(
    (state) => [state.widthState, state.toogleSidebar],
    shallow
  );
  return {
    toogleSidebar,
    widthState,
  };
};

export const useWidthState = () =>
  useAdminLayoutStore((state) => state.widthState);

export const usePopoverState = () => {
  const { popoverOpen, onPopClose, onPopOpen } = useAdminLayoutStore(
    (state) => ({
      popoverOpen: state.popoverOpen,
      onPopClose: state.onPopClose,
      onPopOpen: state.onPopOpen,
    })
  );

  return { popoverOpen, onPopClose, onPopOpen };
};
