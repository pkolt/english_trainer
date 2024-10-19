import { QueryKey, StoreName } from '../constants';
import { openMyDB } from '../db';
import { queryClient } from '../queryClient';
import { Word, WordType } from './types';

export const getWordList = async (): Promise<Word[]> => {
  const db = await openMyDB();
  return db.getAll(StoreName.Words);
};

export const createWord = async (data: Word, skipInvalidate?: boolean): Promise<void> => {
  const db = await openMyDB();
  await db.add(StoreName.Words, data);
  if (!skipInvalidate) {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
  }
};

export const readWord = async (id: string): Promise<Word | undefined> => {
  const db = await openMyDB();
  return db.get(StoreName.Words, id);
};

export const updateWord = async (word: Word): Promise<void> => {
  const db = await openMyDB();
  await db.put(StoreName.Words, word);
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWord, word.id] });
};

export const deleteWord = async (id: string, skipInvalidate?: boolean): Promise<void> => {
  const db = await openMyDB();
  await db.delete(StoreName.Words, id);
  if (!skipInvalidate) {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
  }
};

export const findAllByWord = async (text: string): Promise<Word[] | undefined> => {
  const db = await openMyDB();
  return db.getAllFromIndex(StoreName.Words, 'by-word', text);
};

export const findByWord = async (text: string): Promise<Word | undefined> => {
  const db = await openMyDB();
  return db.getFromIndex(StoreName.Words, 'by-word', text);
};

export const getCountWordByType = async (wordType: WordType): Promise<number> => {
  const db = await openMyDB();
  return db.countFromIndex(StoreName.Words, 'by-types', [wordType]);
};

export const getCountWordByTag = async (tagId: string): Promise<number> => {
  const db = await openMyDB();
  return db.countFromIndex(StoreName.Words, 'by-tags', [tagId]);
};

export const getAllWordIdsByTag = async (tagId: string): Promise<string[]> => {
  const db = await openMyDB();
  return db.getAllKeysFromIndex(StoreName.Words, 'by-tags', [tagId]);
};
