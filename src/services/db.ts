import { openDB } from 'idb';
import { MyDBSchema, MyDB } from './types';
import { StoreName } from './constants';
import { Word } from './words/types';
import { Tag } from './tags/types';
import { WordProgress } from './wordProgress/types';

const DB_NAME = 'english-trainer';
const DB_VERSION = 1;

export let db: MyDB;

export const getReadyMyDB = async (): Promise<void> => {
  if (db) {
    return;
  }

  db = await openDB<MyDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(StoreName.Words)) {
        const wordStore = db.createObjectStore(StoreName.Words, {
          keyPath: 'id',
          autoIncrement: false,
        });
        wordStore.createIndex('by-word', 'word' satisfies keyof Word);
        wordStore.createIndex('by-translate', 'translate' satisfies keyof Word);
        wordStore.createIndex('by-types', 'types' satisfies keyof Word, { multiEntry: true });
        wordStore.createIndex('by-tags', 'tags' satisfies keyof Word, { multiEntry: true });
      }

      if (!db.objectStoreNames.contains(StoreName.Tags)) {
        const tagStore = db.createObjectStore(StoreName.Tags, {
          keyPath: 'id',
          autoIncrement: false,
        });
        tagStore.createIndex('by-name', 'name' satisfies keyof Tag, { unique: true });
      }

      if (!db.objectStoreNames.contains(StoreName.WordProgress)) {
        const wordProgressStore = db.createObjectStore(StoreName.WordProgress, {
          keyPath: 'id',
          autoIncrement: false,
        });
        wordProgressStore.createIndex('by-word', 'word' satisfies keyof WordProgress, { unique: true });
      }
    },
    // upgrade(db, oldVersion, newVersion, transaction, event) {}
    // blocked(currentVersion, blockedVersion, event) {},
    // blocking(currentVersion, blockedVersion, event) {},
    // terminated() {},
  });
};
