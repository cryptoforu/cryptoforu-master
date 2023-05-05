import { useEffect } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { useAnimate } from 'framer-motion';
import { useBreakpointValue } from '@chakra-ui/react';

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

export const useAdminLayoutAnimation = () => {
  const [scope, animate] = useAnimate();
  const collapsed = useAdminLayoutStore((state) => state.widthState);

  const { width, paddingLeft } = useAdminLayoutStore((state) =>
    state.getStyle()
  );
  const display = useBreakpointValue(
    { base: 'none', md: 'block' },
    {
      fallback: 'md',
    }
  );

  const padding = useBreakpointValue({
    base: '0',
    md: paddingLeft,
  });

  useEffect(() => {
    scope.current &&
      animate(
        'aside',
        {
          width: width,
          display: display,
        },
        {
          duration: 1,
          delay: collapsed ? 0.1 : 0.5,
        }
      );
    animate(
      'main',
      {
        paddingLeft: padding,
      },
      {
        duration: 1,
        delay: collapsed ? 0.2 : 0.3,
      }
    );
  }, [animate, collapsed, display, padding, scope, width]);

  return scope;
};

export const useToogleSidebar = () =>
  useAdminLayoutStore((state) => state.toogleSidebar);

const useAdminLayout = () => {
  const [widthState, toogleSidebar] = useAdminLayoutStore(
    (state) => [state.widthState, state.toogleSidebar],
    shallow
  );
  const paddingLeft = useAdminLayoutStore((state) => state.paddingLeft);
  const widthSize = useAdminLayoutStore((state) => state.widthSize);

  return {
    toogleSidebar,
    widthState,
    widthSize,
    paddingLeft,
  };
};
export default useAdminLayout;

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
export const usePopoverId = () =>
  useAdminLayoutStore((state) => state.popoverId);
