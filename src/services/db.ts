import { openDB, IDBPDatabase } from 'idb';
import { MyDB } from './types';

const DB_NAME = 'english-trainer';
const DB_VERSION = 1;

let _cachedDB: IDBPDatabase<MyDB>;

export const openMyDB = async () => {
  if (_cachedDB) {
    return _cachedDB;
  }

  const db = await openDB<MyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('words')) {
        const wordStore = db.createObjectStore('words', {
          keyPath: 'id',
          autoIncrement: false,
        });

        wordStore.createIndex('by-text-english', 'textEnglish');
        wordStore.createIndex('by-text-translate', 'textTranslate');
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
