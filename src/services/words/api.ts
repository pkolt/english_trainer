import { QueryKey, StoreName } from '../constants';
import { db } from '../db';
import { queryClient } from '../queryClient';
import { Word, WordType } from './types';

export const getWordList = async (): Promise<Word[]> => {
  return db.getAll(StoreName.Words);
};

export const createWord = async (data: Word, skipInvalidate?: boolean): Promise<void> => {
  await db.add(StoreName.Words, data);
  if (!skipInvalidate) {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordTypeChoices] });
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
  }
};

export const readWord = async (id: string): Promise<Word | undefined> => {
  return db.get(StoreName.Words, id);
};

export const updateWord = async (word: Word): Promise<void> => {
  await db.put(StoreName.Words, word);
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWord, word.id] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
};

export const deleteWord = async (id: string, skipInvalidate?: boolean): Promise<void> => {
  await db.delete(StoreName.Words, id);
  if (!skipInvalidate) {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordTypeChoices] });
  }
};

export const findAllByWord = async (text: string): Promise<Word[] | undefined> => {
  return db.getAllFromIndex(StoreName.Words, 'by-word', text);
};

export const findByWord = async (text: string): Promise<Word | undefined> => {
  return db.getFromIndex(StoreName.Words, 'by-word', text);
};

export const getCountWordByType = async (wordType: WordType): Promise<number> => {
  return db.countFromIndex(StoreName.Words, 'by-types', IDBKeyRange.only(wordType));
};

export const getCountWordByTag = async (tagId: string): Promise<number> => {
  return db.countFromIndex(StoreName.Words, 'by-tags', IDBKeyRange.only(tagId));
};

export const getWordsByTag = async (tagId: string): Promise<Word[]> => {
  return db.getAllFromIndex(StoreName.Words, 'by-tags', IDBKeyRange.only(tagId));
};
