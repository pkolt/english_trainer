import { openDB } from 'idb';
import { MyDBSchema, MyDB } from './types';
import { StoreName } from './constants';
import { Word } from './words/types';
import { Tag } from './tags/types';

const DB_NAME = 'english-trainer';
const DB_VERSION = 1;

let _cachedDB: MyDB;

export const openMyDB = async (): Promise<MyDB> => {
  if (_cachedDB) {
    return _cachedDB;
  }

  const db = await openDB<MyDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(StoreName.Words)) {
        const wordStore = db.createObjectStore(StoreName.Words, {
          keyPath: 'id',
          autoIncrement: false,
        });
        wordStore.createIndex('by-word', 'word' satisfies keyof Word);
        wordStore.createIndex('by-translate', 'translate' satisfies keyof Word);
        wordStore.createIndex('by-types', 'types' satisfies keyof Word);
        wordStore.createIndex('by-tags', 'tags' satisfies keyof Word);
      }

      if (!db.objectStoreNames.contains(StoreName.Tags)) {
        const tagStore = db.createObjectStore(StoreName.Tags, {
          keyPath: 'id',
          autoIncrement: false,
        });
        tagStore.createIndex('by-name', 'name' satisfies keyof Tag, { unique: true });
      }
    },
    // upgrade(db, oldVersion, newVersion, transaction, event) {}
    // blocked(currentVersion, blockedVersion, event) {},
    // blocking(currentVersion, blockedVersion, event) {},
    // terminated() {},
  });

  _cachedDB = db;

  return db;
};
