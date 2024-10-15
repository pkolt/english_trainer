import { openDB, IDBPDatabase } from 'idb';
import { MyDB } from './types';
import { TAGS_STORE, WORDS_STORE } from './constants';
import { Word } from './words/types';
import { Tag } from './tags/types';

const DB_NAME = 'english-trainer';
const DB_VERSION = 1;

let _cachedDB: IDBPDatabase<MyDB>;

export const openMyDB = async () => {
  if (_cachedDB) {
    return _cachedDB;
  }

  const db = await openDB<MyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(WORDS_STORE)) {
        const wordStore = db.createObjectStore(WORDS_STORE, {
          keyPath: 'id',
          autoIncrement: false,
        });
        wordStore.createIndex('by-word', 'word' satisfies keyof Word);
        wordStore.createIndex('by-translate', 'translate');
      }

      if (!db.objectStoreNames.contains(TAGS_STORE)) {
        const tagStore = db.createObjectStore(TAGS_STORE, {
          keyPath: 'id',
          autoIncrement: false,
        });
        tagStore.createIndex('by-name', 'name' satisfies keyof Tag);
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
