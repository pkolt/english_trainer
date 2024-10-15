import { DBSchema } from 'idb';
import { Word } from './words/types';
import { TAGS_STORE, WORDS_STORE } from './constants';
import { Tag } from './tags/types';

export interface MyDB extends DBSchema {
  [WORDS_STORE]: {
    key: string;
    value: Word;
    indexes: {
      'by-word': string;
      'by-translate': string;
    };
  };
  [TAGS_STORE]: {
    key: string;
    value: Tag;
    indexes: {
      'by-name': string;
    };
  };
}
