import { useEffect } from 'react';
import { pwaAcceptUpdate, subscribePwaRequestUpdate } from './utils';
import { useDialogs } from '@toolpad/core/useDialogs';

export const UpdatePWA = (): JSX.Element | null => {
  const dialogs = useDialogs();

  useEffect(() => {
    const unsubscribe = subscribePwaRequestUpdate(() => {
      dialogs
        .confirm('Обновить приложение и перезагрузить страницу?', {
          title: 'Обновление приложения',
          okText: 'Да',
          cancelText: 'Нет',
        })
        .then((confirmed: boolean) => {
          if (confirmed) {
            pwaAcceptUpdate();
          }
        });
    });
    return unsubscribe;
  });
  return null;
};
