import { useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ToastId, useToast as useChakraToast } from '@chakra-ui/react';
import { usePageProps } from '@/Hooks/useTypedPage';
import { Flash } from '@/types';
import { shallow } from 'zustand/shallow';

type ToastState = {
  isToastOpen: boolean;
  status: 'success' | 'warning';
  message: string;
  title: string;
  duration: number;
};

type ToastActions = {
  flash: (action: boolean) => void;
  setToast: (status: ToastState['status'], message: string) => void;
};

export interface ToastStore extends ToastState, ToastActions {}

const useToastProvider = create<ToastStore>()(
  immer((set, get) => ({
    isToastOpen: false,
    status: 'success',
    message: '',
    title: '',
    duration: 9000,
    flash: (action) =>
      set((state) => {
        state.isToastOpen = action;
      }),
    setToast: (status, message) =>
      set((state) => {
        state.status = status;
        state.message = message;
        state.title = status.toUpperCase();
      }),
  }))
);

export const useToast = () => {
  const { flash } = usePageProps<Flash>();
  const stateRef = useRef(useToastProvider.getState().isToastOpen);
  const setFlash = useToastProvider((state) => state.flash);
  const setToast = useToastProvider((state) => state.setToast);
  const toastIdRef = useRef<ToastId>();
  useEffect(
    () =>
      useToastProvider.subscribe(
        (state) => (stateRef.current = state.isToastOpen)
      ),
    []
  );
  const options = useToastProvider(
    (state) => ({
      status: state.status,
      message: state.message,
      title: state.title,
      duration: state.duration,
    }),
    shallow
  );
  useEffect(() => {
    if (flash.success) {
      setToast('success', flash.success);
      setFlash(true);
    } else if (flash.warning) {
      setToast('warning', flash.warning);
      setFlash(true);
    }
  }, [flash.success, flash.warning, setFlash, setToast]);
  const toast = useChakraToast();

  const addToast = useCallback(() => {
    if (toastIdRef.current) {
      toastIdRef.current = toast({ ...options });
    }
  }, [options, toast]);

  const onClose = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      setFlash(false);
    }
  }, [setFlash, toast]);

  useEffect(() => {
    if (!stateRef.current) {
      return;
    } else if (stateRef.current) {
      addToast();
    }
    const timeoutId = setTimeout(() => {
      onClose();
    }, 9000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [addToast, onClose]);
};
