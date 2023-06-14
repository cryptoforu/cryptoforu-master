import { router } from '@inertiajs/react';
import { useTransition } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

import { usePageProps } from '@/Hooks/useTypedPage';
import type { FormData } from '@/Types/generated';

type Category = {
  id: 'category_form';
  name: string;
  description: string;
  category_image?: string;
};

type OptionsProps = {
  id: string | number;
  name: string;
};

interface CategoriesStore {
  category: string;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setCategory: (category: string) => void;
}

type CategoryForm = {
  [x: CategoriesStore['category']]: {
    initialValues: Category;
    form_schema: {
      [Property in keyof Category]: FormData<OptionsProps>;
    };
    form_route: string;
  };
};

const useCategoriesStore = create<CategoriesStore>((set) => ({
  category: 'category_form',
  isDrawerOpen: false,
  openDrawer: () => set(() => ({ isDrawerOpen: true })),
  closeDrawer: () => set(() => ({ isDrawerOpen: false })),
  setCategory: (category) => {
    router.reload({
      only: [category],
      onSuccess: () => {
        set(() => ({ category: category }));
      },
      onFinish: () => {
        set(() => ({ isDrawerOpen: true }));
      },
    });
  },
}));

export const useCategory = () => {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useCategoriesStore(
    (state) => [state.category, state.setCategory],
    shallow
  );

  const values = usePageProps<CategoryForm>()[category || 'category_form'];

  const label =
    category === 'category_form'
      ? 'Add New Category'
      : `Edit ${values?.initialValues.name}`;

  function selectCategory(payload: string) {
    startTransition(() => {
      setCategory(payload);
    });
  }

  const method = category === 'category_form' ? undefined : 'patch';
  return {
    values,
    selectCategory,
    isPending,
    label,
    method,
    category,
  };
};

export const useDrawerState = () =>
  useCategoriesStore((state) => state.isDrawerOpen);
export const useCloseDrawer = () =>
  useCategoriesStore((state) => state.closeDrawer);
