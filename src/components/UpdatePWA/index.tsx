import { useEffect } from 'react';
import { useDialogs } from '@toolpad/core/useDialogs';
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from 'virtual:pwa-register/react';
import { registerPeriodicSync } from './utils';

export const UpdatePWA = (): JSX.Element | null => {
  const dialogs = useDialogs();

  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  useEffect(() => {
    if (needRefresh) {
      dialogs
        .confirm('Обновить приложение и перезагрузить страницу?', {
          title: 'Обновление приложения',
          okText: 'Да',
          cancelText: 'Нет',
        })
        .then((confirmed: boolean) => {
          if (confirmed) {
            // Apply update
            updateServiceWorker(true);
          } else {
            // Close dialog
            setNeedRefresh(false);
          }
        });
    }
  }, [needRefresh, updateServiceWorker, setNeedRefresh, dialogs]);

  return null;
};
