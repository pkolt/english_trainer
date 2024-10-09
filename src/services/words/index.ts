import { openMyDB } from '../db';
import { Word } from './types';

export const getWordList = async (): Promise<Word[]> => {
  const db = await openMyDB();
  return db.getAll('words');
};

export const createWord = async (data: Word): Promise<string> => {
  const db = await openMyDB();
  return db.add('words', data);
};

export const readWord = async (id: string): Promise<Word | undefined> => {
  const db = await openMyDB();
  return db.get('words', id);
};

export const updateWord = async (data: Word): Promise<string> => {
  const db = await openMyDB();
  return db.put('words', data);
};

export const deleteWord = async (id: string): Promise<void> => {
  const db = await openMyDB();
  return db.delete('words', id);
};
