import { useEffect, useRef, useTransition } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import type { LibraryData } from '@/Types/generated';

type SelectedProps = {
  id?: number;
};

type LibraryState = {
  hoveredId: string | number;
  values: LibraryData;
  showingDetails: boolean;
  selectAll: boolean;
  selected: Array<SelectedProps>;
  isEditing: boolean;
};

type LibraryActions = {
  isHovered: (id: string | number) => boolean;
  setHovered: (id: string | number) => void;
  setValues: (payload: LibraryData) => void;
  toogleDetails: () => void;
  setSelected: (id: number) => void;
  setAllSelected: (ids: number[]) => void;
  isChecked: (id: number) => boolean;
  toogleSelect: () => void;
  clearSelected: () => void;
  setEditing: () => void;
};

interface LibraryStore extends LibraryState, LibraryActions {}

const useLibraryStore = create<LibraryStore>()(
  immer((set, get) => ({
    hoveredId: 0,
    values: {
      id: 0,
      file_name: '',
      conversions: {
        lg_name: '',
        md_name: '',
        sm_name: '',
      },
      mime_type: '',
      size: '',
      width: 256,
      height: 256,
    },
    showingDetails: false,
    selected: [],
    selectAll: false,
    isEditing: false,
    isHovered: (id) => {
      return get().hoveredId === id;
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
    setAllSelected: (ids) =>
      set((state) => {
        if (state.selected.length > 0) {
          state.selected = [];
        } else {
          ids.forEach((id) => state.selected.push({ id: id }));
        }
      }),
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
    setEditing: () =>
      set((prev) => {
        prev.isEditing = !prev.isEditing;
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
  const { selected, toogleSelect, clearSelected, setAllSelected } =
    useLibraryStore(
      (state) => ({
        selected: state.selected,
        toogleSelect: state.toogleSelect,
        clearSelected: state.clearSelected,
        setAllSelected: state.setAllSelected,
      }),
      shallow
    );

  return {
    selected,
    toogleSelect,
    clearSelected,
    setAllSelected,
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

export const useIsEditing = () => {
  const [isEditing, setEditing] = useLibraryStore(
    (state) => [state.isEditing, state.setEditing],
    shallow
  );
  const [isPending, startTransition] = useTransition();

  function onEditChange() {
    startTransition(() => {
      setEditing();
    });
  }

  return {
    isEditing,
    isPending,
    onEditChange,
  };
};
