import { db } from '../db';
import { Tag, TagWithCount } from './types';
import { deleteWord, getWordsByTag, getCountWordByTag, updateWord, getWordList } from '../words/api';
import { EMPTY_TAG_ID, EMPTY_TAG_NAME, QueryKey, StoreName } from '../constants';
import { queryClient } from '../queryClient';

// IndexedDB isn't allowing filtering by an empty array
const getCountWordsWithoutTags = async (): Promise<number> => {
  const allWords = await getWordList();
  return allWords.filter((it) => it.tags.length === 0).length;
};

export interface GetTagListParams {
  emptyTag?: boolean;
}

export const getTagList = async ({ emptyTag }: GetTagListParams): Promise<TagWithCount[]> => {
  const tags = await db.getAll(StoreName.Tags);
  const result: TagWithCount[] = [];
  for (const tag of tags) {
    const count = await getCountWordByTag(tag.id);
    result.push({ ...tag, count });
  }
  if (emptyTag) {
    const countWordsWithoutTags = await getCountWordsWithoutTags();
    if (countWordsWithoutTags) {
      result.push({
        id: EMPTY_TAG_ID,
        name: EMPTY_TAG_NAME,
        createdAt: '',
        updatedAt: '',
        count: countWordsWithoutTags,
      });
    }
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
  const words = await getWordsByTag(id);
  await db.delete(StoreName.Tags, id);
  for (const word of words) {
    if (word.tags.length > 1) {
      await updateWord({ ...word, tags: word.tags.filter((tagId) => tagId !== id) });
    } else {
      await deleteWord(word.id, true);
    }
  }
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
  await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
};

export const findByTag = async (text: string): Promise<Tag | undefined> => {
  return db.getFromIndex(StoreName.Tags, 'by-name', text);
};
