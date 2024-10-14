import { Word } from '@/services/words/types';
import { DateTime } from 'luxon';

export const getDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    text: '',
    translate: '',
    transcription: '',
    description: '',
    example: '',
    exampleTranslate: '',
    note: '',
    favorite: false,
  };
};
