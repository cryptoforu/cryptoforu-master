import { FilePondFile } from 'filepond';
import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Item = {
  id?: string | number;
};

interface InputStore<T extends object> {
  showInput?: number | string;
  values: T;
  id: string | number;
  setInput: (id: number | string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activeInput: (id: number | string) => boolean;
  setFile: (
    fileitems: FilePondFile[],
    name: string,
    id: string | number
  ) => void;
  setValues: (payload: T) => void;
}

const useEditInputStore = create<InputStore<Item>>()(
  immer((set, get) => ({
    showInput: 0,
    id: '',
    values: {},
    setInput: (action) =>
      set((state) => {
        state.showInput = state.showInput === action ? 0 : action;
      }),
    setValues: (payload) =>
      set((state) => {
        state.values = payload;
      }),
    handleInputChange: (e) =>
      set((state) => {
        const key = e.target.name;
        const type = e.target.type;
        if (type === 'file') {
          state.values = {
            [key]: e.target?.files && e.target.files[0],
          };
        } else if (type === 'text') {
          state.values = {
            [key]: e.target.value,
          };
        }
        const id = e.target.id;
        state.id = id;
      }),
    activeInput: (id) => {
      const isActive = get().showInput === id;
      return isActive;
    },
    setFile: (fileitems, name, id) =>
      set((state) => {
        state.id = id;
        state.values = {
          [name]: fileitems[0].file,
        };
      }),
  }))
);

export const useInputState = () =>
  useEditInputStore((state) => state.showInput);
export const useInputValues = () => useEditInputStore((state) => state.values);
export const useSetInput = () => useEditInputStore((state) => state.setInput);
export const useInputChange = () =>
  useEditInputStore((state) => state.handleInputChange);
export const useIsEditing = (id: number | string) =>
  useEditInputStore((state) => state.activeInput(id));
export const useSetFile = () => useEditInputStore((state) => state.setFile);
export const useEditId = () => useEditInputStore((state) => state.id);
export const useSetValues = () => useEditInputStore((state) => state.setValues);
export default useEditInputStore;
