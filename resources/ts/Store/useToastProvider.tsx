import { ToastId, useToast as useChakraToast } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import useTypedPage, { usePageProps } from '@/Hooks/useTypedPage';
import { Flash } from '@/types';

type ToastState = {
  isToastOpen: boolean;
  status: 'success' | 'warning' | 'error';
  description: string;
  title: string;
  duration: number;
};

type ToastActions = {
  flash: (action: boolean) => void;
  setToast: (status: ToastState['status'], message: string) => void;
};

export interface ToastStore extends ToastState, ToastActions {}

const useToastProvider = create<ToastStore>()(
  immer((set) => ({
    isToastOpen: false,
    status: 'success',
    description: '',
    title: '',
    duration: 9000,
    flash: (action) =>
      set((state) => {
        state.isToastOpen = action;
      }),
    setToast: (status, message) =>
      set((state) => {
        state.status = status;
        state.description = message;
        state.title = status.toUpperCase();
      }),
  }))
);

export const useToast = () => {
  const { flash } = usePageProps<Flash>();
  const { errors } = useTypedPage().props;
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
      description: state.description,
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

  const onClose = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      setFlash(false);
    }
  }, [setFlash, toast]);
  useEffect(() => {
    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        toastIdRef.current = toast({
          id: key,
          title: 'Error',
          description: value as string,
          status: 'error',
          position: 'top',
        });
      }
    }
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [errors, onClose, toast]);
  useEffect(() => {
    if (!stateRef.current) {
      return;
    } else if (stateRef.current) {
      toastIdRef.current = toast({ ...options });
    }
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose, options, toast]);
};
