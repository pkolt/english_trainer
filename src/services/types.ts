import { DBSchema, IDBPDatabase } from 'idb';
import { Word, WordType } from './words/types';
import { StoreName } from './constants';
import { Tag } from './tags/types';
import { WordProgress } from './wordProgress/types';

export interface MyDBSchema extends DBSchema {
  [StoreName.Words]: {
    key: string;
    value: Word;
    indexes: {
      'by-word': string;
      'by-translate': string;
      'by-types': WordType[];
      'by-tags': string[];
    };
  };
  [StoreName.Tags]: {
    key: string;
    value: Tag;
    indexes: {
      'by-name': string;
    };
  };
  [StoreName.WordProgress]: {
    key: string;
    value: WordProgress;
    indexes: {
      'by-word': string;
    };
  };
}

export type MyDB = IDBPDatabase<MyDBSchema>;
