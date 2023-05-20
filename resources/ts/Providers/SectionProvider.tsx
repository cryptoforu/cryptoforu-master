import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import produce from 'immer';
type SectionContextProps = {
  isLazy: boolean;
  label: string;
  sectionId: string;
  isLoaded: boolean;
};

type SectionDispatchProps = {
  handleLoad: (id: string) => void;
};

export interface ISectionProviderProps {
  isLazy: boolean;
  label: string;
  sectionId: string;
}

const SectionContext = createContext<SectionContextProps | null>(null);

const SectionDispatchContext = createContext<SectionDispatchProps | null>(null);

function SectionProvider({
  isLazy,
  label,
  sectionId,
  children,
}: PropsWithChildren<ISectionProviderProps>) {
  const [sections, setSections] = useState({
    [sectionId]: false,
  });
  const handleLoad = useCallback((id: string) => {
    setSections(
      produce((draft) => {
        draft[id] = true;
      })
    );
  }, []);
  const loaded = sections[sectionId];
  return (
    <SectionContext.Provider
      value={{
        isLazy,
        label,
        sectionId,
        isLoaded: loaded,
      }}
    >
      <SectionDispatchContext.Provider value={{ handleLoad }}>
        {children}
      </SectionDispatchContext.Provider>
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext<SectionContextProps>(
    SectionContext as unknown as React.Context<SectionContextProps>
  );
  if (!context) {
    throw new Error('useSectionContext must be used under SectionProvider');
  }
  return context;
}

export function useSectionDispatch() {
  const dispatch = useContext<SectionDispatchProps>(
    SectionDispatchContext as unknown as React.Context<SectionDispatchProps>
  );
  if (!dispatch) {
    throw new Error('useSectionDispatch must be used under SectionProvider');
  }
  return dispatch;
}

export default SectionProvider;
