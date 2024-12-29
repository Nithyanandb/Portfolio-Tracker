import { useState, useCallback } from 'react';

interface PopupState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

export const usePopup = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const showPopup = useCallback((message: string, type: 'success' | 'error') => {
    setPopup({
      isOpen: true,
      message,
      type
    });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    popup,
    showPopup,
    hidePopup
  };
};