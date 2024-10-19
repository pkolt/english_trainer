import { db } from '../db';
import { Tag, TagWithCount } from './types';
import { deleteWord, getAllWordIdsByTag, getCountWordByTag } from '../words/api';
import { QueryKey, StoreName } from '../constants';
import { queryClient } from '../queryClient';

export const getTagList = async (): Promise<TagWithCount[]> => {
  const tags = await db.getAll(StoreName.Tags);
  const result: TagWithCount[] = [];
  for (const tag of tags) {
    const count = await getCountWordByTag(tag.id);
    result.push({ ...tag, count });
  }
  return result;
};

export const createTag = async (tag: Tag, skipInvalidate?: boolean): Promise<void> => {
  await db.add(StoreName.Tags, tag);
  if (!skipInvalidate) {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
  }
};

export const readTag = async (id: string): Promise<Tag | undefined> => {
  return db.get(StoreName.Tags, id);
};

export const updateTag = async (tag: Tag): Promise<void> => {
  await db.put(StoreName.Tags, tag);
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTag, tag.id] });
};

export const deleteTag = async (id: string): Promise<void> => {
  //! Need transaction
  const wordIds = await getAllWordIdsByTag(id);
  await db.delete(StoreName.Tags, id);
  for (const wordId of wordIds) {
    await deleteWord(wordId, true);
  }
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
};

export const findByTag = async (text: string): Promise<Tag | undefined> => {
  return db.getFromIndex(StoreName.Tags, 'by-name', text);
};
