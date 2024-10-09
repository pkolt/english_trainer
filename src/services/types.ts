import { DBSchema } from 'idb';
import { Word } from './words/types';
import { WORDS_STORE } from './words/constants';

export interface MyDB extends DBSchema {
  [WORDS_STORE]: {
    key: string;
    value: Word;
    indexes: {
      'by-text': string;
      'by-translate': string;
    };
  };
}
