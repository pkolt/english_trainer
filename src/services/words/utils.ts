import { DateTime } from 'luxon';
import { Word } from './types';

export const getWordDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    types: [],
    word: '',
    translate: '',
    transcription: '',
    description: '',
    example: '',
    exampleTranslate: '',
    note: '',
    favorite: false,
    tags: [],
  };
};
