import { Word } from '@/services/words/types';
import { DateTime } from 'luxon';

export const makeDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    type: undefined,
    createdAt: today,
    updatedAt: today,
    text: '',
    translate: '',
    transcription: '',
  };
};
