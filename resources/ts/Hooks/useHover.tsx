import { useCallback } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

type HoverState = {
  hoveredIndex?: number | string;
};

type HoverAction = {
  setHovered: (index?: number | string) => void;
  isHovered: (index?: number | string) => boolean;
};

export interface HoverStore extends HoverState, HoverAction {}

const useHoverStore = create<HoverStore>()(
  immer((set, get) => ({
    hoveredIndex: undefined,
    setHovered: (index) =>
      set((state) => {
        state.hoveredIndex = index;
      }),
    isHovered: (index) => {
      const hovered = get().hoveredIndex === index;
      return hovered;
    },
  }))
);

const useHover = () => {
  const { hoveredIndex, setHovered, isHovered } = useHoverStore(
    (state) => ({
      hoveredIndex: state.hoveredIndex,
      setHovered: state.setHovered,
      isHovered: state.isHovered,
    }),
    shallow
  );

  const onHover = useCallback(
    (id?: number | string) => {
      if (id !== undefined) {
        setHovered(id);
      } else {
        setHovered(undefined);
      }
    },
    [setHovered]
  );

  return {
    hoveredIndex,
    isHovered,
    onHover,
  };
};

export default useHover;
