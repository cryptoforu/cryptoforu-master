import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Data = {
  key: string;
  value: string;
};

type FormData = {
  data: Data[];
  setData: () => void;
};

type InputForm = {
  handleChange: (index: number, event: ChangeEvent<any>) => void;
  addFields: () => void;
  removeFields: (index: number) => void;
};

export interface UseFormArray extends FormData, InputForm {}

const useFormArray = create(
  immer<UseFormArray>((set, get) => ({
    data: [
      {
        key: '',
        value: '',
      },
    ],
    setData: () =>
      set((state) => {
        const newData = [...state.data];
        state.data = newData;
      }),
    handleChange: (index, event) =>
      set((state) => {
        const newData = [...state.data];
        const elementIndex = newData[index];
        const key = event.target.name as keyof Data;
        elementIndex[key] = event.target.value;
        state.data = newData;
      }),
    addFields: () =>
      set((state) => {
        state.data.push({
          key: '',
          value: '',
        });
      }),
    removeFields: (index) =>
      set((state) => {
        const newData = [...state.data];
        newData.splice(index, 1);
        state.data = newData;
      }),
  }))
);
export default useFormArray;
