import { QueryKey, StoreName } from '../constants';
import { db } from '../db';
import { queryClient } from '../queryClient';
import { WordProgress } from './types';

export const getWordProgressList = async (): Promise<WordProgress[]> => {
  return db.getAll(StoreName.WordProgress);
};

export const readWordProgress = async (id: string): Promise<WordProgress | undefined> => {
  return db.get(StoreName.WordProgress, id);
};

export const updateWordProgress = async (rating: WordProgress): Promise<void> => {
  await db.put(StoreName.WordProgress, rating);
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordProgressList] });
};

export const findWordProgressByWord = async (wordId: string): Promise<WordProgress | undefined> => {
  return db.getFromIndex(StoreName.WordProgress, 'by-word', wordId);
};
