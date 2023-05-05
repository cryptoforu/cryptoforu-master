import { create } from 'zustand';
import { useEffect, useRef } from 'react';
import { immer } from 'zustand/middleware/immer';
import type { LibraryData } from '@/Types/generated';
import { shallow } from 'zustand/shallow';

type SelectedProps = {
  id?: number;
};

type LibraryState = {
  hoveredId: string | number;
  values: LibraryData;
  showingDetails: boolean;
  selectAll: boolean;
  selected: Array<SelectedProps>;
};

type LibraryActions = {
  isHovered: (id: string | number) => boolean;
  setHovered: (id: string | number) => void;
  setValues: (payload: LibraryData) => void;
  toogleDetails: () => void;
  setSelected: (id: number) => void;
  isChecked: (id: number) => boolean;
  toogleSelect: () => void;
  clearSelected: () => void;
};

interface LibraryStore extends LibraryState, LibraryActions {}

const useLibraryStore = create<LibraryStore>()(
  immer((set, get) => ({
    hoveredId: 0,
    values: {
      id: 0,
      file_name: '',
      mime_type: '',
      size: '',
      width: 256,
      height: 256,
    },
    showingDetails: false,
    selected: [],
    selectAll: false,
    isHovered: (id) => {
      const hovered = get().hoveredId === id;
      return hovered;
    },
    setHovered: (id) =>
      set((state) => {
        state.hoveredId = state.hoveredId === id ? 0 : id;
      }),
    setValues: (payload) => {
      set((state) => {
        state.values = payload;
        state.showingDetails = true;
      });
    },
    toogleDetails: () =>
      set((prev) => {
        prev.showingDetails = !prev.showingDetails;
      }),
    setSelected: (index) => {
      set((state) => {
        const draft = state.selected.find((element) => element.id === index);
        if (draft) {
          draft.id = undefined;
        } else {
          state.selected.push({ id: index });
        }
      });
    },
    isChecked: (index) => {
      const selected = get().selected?.find((el) => el.id === index);
      return selected !== undefined;
    },
    toogleSelect: () =>
      set((prev) => {
        prev.selectAll = !prev.selectAll;
      }),
    clearSelected: () =>
      set((state) => {
        state.selected = [];
      }),
  }))
);

export const useHovered = () => {
  const [isHovered, setHovered] = useLibraryStore(
    (state) => [state.isHovered, state.setHovered],
    shallow
  );
  return {
    isHovered,
    setHovered,
  };
};

export const useSelectAll = () => {
  const { selected, toogleSelect, clearSelected } = useLibraryStore(
    (state) => ({
      selected: state.selected,
      toogleSelect: state.toogleSelect,
      clearSelected: state.clearSelected,
    }),
    shallow
  );

  return {
    selected,
    toogleSelect,
    clearSelected,
  };
};

export const useChecked = () => {
  const { isChecked, setSelected, selectAll } = useLibraryStore((state) => ({
    isChecked: state.isChecked,
    setSelected: state.setSelected,
    selectAll: state.selectAll,
  }));
  return {
    setSelected,
    isChecked,
    selectAll,
  };
};

export const useDetails = () => {
  const valuesRef = useRef(useLibraryStore.getState().values);
  useEffect(
    () =>
      useLibraryStore.subscribe((state) => (valuesRef.current = state.values)),
    []
  );
  const { showingDetails, toogleDetails, setValues } = useLibraryStore(
    (state) => ({
      showingDetails: state.showingDetails,
      toogleDetails: state.toogleDetails,
      setValues: state.setValues,
    })
  );

  return {
    values: valuesRef.current,
    toogleDetails,
    setValues,
    showingDetails,
  };
};
