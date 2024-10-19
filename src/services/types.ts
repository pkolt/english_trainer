import { DBSchema, IDBPDatabase } from 'idb';
import { Word, WordType } from './words/types';
import { StoreName } from './constants';
import { Tag } from './tags/types';

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
}

export type MyDB = IDBPDatabase<MyDBSchema>;
