import { StoreName } from '../constants';
import { db } from '../db';
import { WordProgress } from './types';

export const createWordProgress = async (wordProgress: WordProgress): Promise<void> => {
  await db.add(StoreName.WordProgress, wordProgress);
};

export const readWordProgress = async (id: string): Promise<WordProgress | undefined> => {
  return db.get(StoreName.WordProgress, id);
};

export const updateWordProgress = async (rating: WordProgress): Promise<void> => {
  await db.put(StoreName.WordProgress, rating);
};

export const findWordProgressByWord = async (wordId: string): Promise<WordProgress | undefined> => {
  return db.getFromIndex(StoreName.WordProgress, 'by-word', wordId);
};
