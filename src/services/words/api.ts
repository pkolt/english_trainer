import { openMyDB } from '../db';
import { WORDS_STORE } from '../constants';
import { Word, WordType } from './types';

export const getWordList = async (): Promise<Word[]> => {
  const db = await openMyDB();
  return db.getAll(WORDS_STORE);
};

export const createWord = async (data: Word): Promise<string> => {
  const db = await openMyDB();
  return db.add(WORDS_STORE, data);
};

export const readWord = async (id: string): Promise<Word | undefined> => {
  const db = await openMyDB();
  return db.get(WORDS_STORE, id);
};

export const updateWord = async (data: Word): Promise<string> => {
  const db = await openMyDB();
  return db.put(WORDS_STORE, data);
};

export const deleteWord = async (id: string): Promise<void> => {
  const db = await openMyDB();
  return db.delete(WORDS_STORE, id);
};

export const findAllByWord = async (text: string): Promise<Word[] | undefined> => {
  const db = await openMyDB();
  return db.getAllFromIndex(WORDS_STORE, 'by-word', text);
};

export const findByWord = async (text: string): Promise<Word | undefined> => {
  const db = await openMyDB();
  return db.getFromIndex(WORDS_STORE, 'by-word', text);
};

export const getCountWordByType = async (wordType: WordType): Promise<number> => {
  const db = await openMyDB();
  return db.countFromIndex(WORDS_STORE, 'by-types', [wordType]);
};
