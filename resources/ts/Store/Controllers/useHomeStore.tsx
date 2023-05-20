import { useMemo, useTransition } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { usePageProps } from '@/Hooks/useTypedPage';
import { shallow } from 'zustand/shallow';
import type { EarnCategory } from '@/Types/generated';
import { PaperCard } from '@/Components/Elements/Content';
type IHomeStateProps = {
  earnTab: number;
};

type IHomeActionProps = {
  setEarnTab: (action: number) => void;
  getEarnSelected: (index: number) => boolean;
};

export interface IHomeStore extends IHomeStateProps, IHomeActionProps {}

const useHomeStore = create<IHomeStore>()(
  immer((set, get) => ({
    earnTab: 0,
    setEarnTab: (action) =>
      set((state) => {
        state.earnTab = action;
      }),
    getEarnSelected: (index) => {
      const current = get().earnTab === index;
      return current;
    },
  }))
);

export const useEarnData = () => {
  const [earnTab, setEarnTab] = useHomeStore(
    (state) => [state.earnTab, state.setEarnTab],
    shallow
  );
  const [isPending, startTransition] = useTransition();
  function selectEarnTab(index: number) {
    startTransition(() => {
      setEarnTab(index);
    });
  }
  const getEarnSelected = useHomeStore((state) => state.getEarnSelected);
  const { earn_categories } = usePageProps<EarnCategory[]>();
  const data = useMemo(
    () =>
      earn_categories.map((category) => ({
        label: category.name,
        content: category.earn?.map((e) => (
          <PaperCard
            key={e.id}
            title={e.title}
            badgeColor={category.color}
            badge={category.name}
            description={e.main_features as string}
            bgImage={e.image_name as string}
            slug={e.link as string}
          />
        )),
      })),
    [earn_categories]
  );
  return {
    earnTab,
    isPending,
    selectEarnTab,
    data,
    getEarnSelected,
  };
};
