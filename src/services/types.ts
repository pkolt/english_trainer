import { DBSchema } from 'idb';
import { Word } from './words/types';

export interface MyDB extends DBSchema {
  words: {
    key: string;
    value: Word;
    indexes: {
      'by-text-english': string;
      'by-text-translate': string;
    };
  };
}
