import { openMyDB } from '../db';
import { TAGS_STORE } from '../constants';
import { Tag } from './types';

export const getTagList = async (): Promise<Tag[]> => {
  const db = await openMyDB();
  return db.getAll(TAGS_STORE);
};

export const createTag = async (data: Tag): Promise<string> => {
  const db = await openMyDB();
  return db.add(TAGS_STORE, data);
};

export const readTag = async (id: string): Promise<Tag | undefined> => {
  const db = await openMyDB();
  return db.get(TAGS_STORE, id);
};

export const updateTag = async (data: Tag): Promise<string> => {
  const db = await openMyDB();
  return db.put(TAGS_STORE, data);
};

export const deleteTag = async (id: string): Promise<void> => {
  const db = await openMyDB();
  return db.delete(TAGS_STORE, id);
};

export const findByTag = async (text: string): Promise<Tag | undefined> => {
  const db = await openMyDB();
  return db.getFromIndex(TAGS_STORE, 'by-name', text);
};
