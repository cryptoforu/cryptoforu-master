import { router } from '@inertiajs/react';
import { useDeferredValue } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

import { usePageProps } from '@/Hooks/useTypedPage';
import type { FormData, PageMeta } from '@/Types/generated';

type OptionsProps = {
  id: string | number;
  name: string;
};

type PageForm = {
  [x: SettingsStore['page']]: {
    initialValues: PageMeta;
    form_schema: {
      [Property in keyof PageMeta]: FormData<OptionsProps>;
    };
    form_route: string;
  };
};

interface SettingsStore {
  page: string;
  setPage: (page: string) => void;
  isEditing: boolean;
  setEditing: (action: boolean) => void;
}

const usePageSettings = create<SettingsStore>((set) => ({
  page: 'dashboard',
  setPage: (page) => {
    router.reload({
      only: [page],
      onSuccess: () => {
        set(() => ({ page: page }));
      },
    });
  },
  isEditing: false,
  setEditing: (action) => set(() => ({ isEditing: action })),
}));

export const usePageForm = () => {
  const [page, setPage] = usePageSettings(
    (state) => [state.page, state.setPage],
    shallow
  );
  const val = usePageProps<PageForm>()[page];
  const label = useDeferredValue(val?.initialValues?.label);
  return { values: val, setPage, label, page };
};

export const useSelectedPage = () => usePageSettings((state) => state.page);

export const useEditing = () => {
  const [isEditing, setEditing] = usePageSettings(
    (state) => [state.isEditing, state.setEditing],
    shallow
  );
  return { isEditing, setEditing };
};
