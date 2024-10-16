import { DateTime } from 'luxon';
import { Tag } from './types';

export const getTagDefaultValues = (): Tag => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    name: '',
  };
};
