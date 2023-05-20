import { useRef, useEffect, useCallback, ChangeEvent } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useRoute } from '@/Providers/RouteProvider';
import type { FormData, FormType } from '@/Types/generated';
import { shallow } from 'zustand/shallow';

type SelectOptions = {
  id: string | number;
  name: string;
};

type InitialValues = {
  id: string;
  [x: string]: string | number | [];
};

type InitialProps = {
  [x: string]: string;
  key: string;
  value: string;
  type: FormType;
};

type FormBuilder = {
  initial: InitialProps;
  initialValues: InitialValues;
  form_schema: {
    [Property in keyof InitialValues]: FormData<SelectOptions>;
  };
  form_route: string;
};

export interface BuilderStore extends FormBuilder {
  addValue: (
    key: string,
    value: string,
    payload: FormData<SelectOptions>
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  addRoute: (route: string) => void;
  clearForm: () => void;
}

const useFormStore = create<BuilderStore>()(
  immer((set, get) => ({
    initial: {
      key: '',
      value: '',
      type: 'textfield',
    },
    initialValues: {
      id: '',
    },
    form_schema: {
      id: {
        label: 'Id',
        name: 'id',
        type: 'textfield',
      },
    },
    form_route: 'add.settings',
    addValue: (key, value, payload) =>
      set((state) => {
        const current = get().initialValues;
        const schema = get().form_schema;
        state.initialValues = {
          ...current,
          [key]: value,
        };
        state.form_schema = {
          ...schema,
          [key]: {
            label: payload.label,
            name: payload.name,
            type: payload.type,
            options: payload.options,
          },
        };
      }),
    handleChange: (e) =>
      set((state) => {
        const key = e.target.name;
        const value = e.target.value;
        state.initial[key] = value;
      }),
    addRoute: (route) =>
      set((state) => {
        state.form_route = route;
      }),
    clearForm: () =>
      set((state) => {
        state.initial = {
          key: '',
          value: '',
          type: 'textfield',
        };
        state.initialValues = {
          id: '',
        };
        state.form_schema = {
          id: {
            label: 'Id',
            name: 'id',
            type: 'textfield',
          },
        };
      }),
  }))
);

export const useFormBuilder = () => {
  const initialValuesRef = useRef(useFormStore.getState().initialValues);
  const schemaRef = useRef(useFormStore.getState().form_schema);
  const [form_route, addRoute] = useFormStore((state) => [
    state.form_route,
    state.addRoute,
  ]);
  const addValues = useFormStore((state) => state.addValue);
  const clearForm = useFormStore((state) => state.clearForm);
  useEffect(
    () =>
      useFormStore.subscribe(
        (state) => (initialValuesRef.current = state.initialValues)
      ),
    []
  );
  useEffect(
    () =>
      useFormStore.subscribe(
        (state) => (schemaRef.current = state.form_schema)
      ),
    []
  );

  const handleAdd = useCallback<BuilderStore['addValue']>(
    (key, value, payload) => {
      addValues(key, value, payload);
    },
    [addValues]
  );
  const { route } = useRoute();
  return {
    initialValues: initialValuesRef.current,
    form_schema: schemaRef.current,
    form_route: route(form_route),
    addRoute,
    handleAdd,
    clearForm,
  };
};

export const useInitial = () => {
  const [initial, handleChange] = useFormStore(
    (state) => [state.initial, state.handleChange],
    shallow
  );
  return { initial, handleChange };
};
