import { useLocalStorageState } from '@toolpad/core';
import { Settings } from './schema';

export const useSettings = () => {
  return useLocalStorageState<Settings>('settings', null, {
    codec: {
      parse: (data: string) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('Error parsed settings:', error);
          return null;
        }
      },
      stringify: JSON.stringify,
    },
  });
};
