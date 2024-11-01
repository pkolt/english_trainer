import { Word } from '@/services/words/types';

export const filterWordsByTagIds = (list: Word[], tagIds: string[]): Word[] => {
  if (tagIds.length > 0) {
    const searchSet = new Set(tagIds);
    return list.filter((it) => it.tags.length > 0 && !new Set(it.tags).isDisjointFrom(searchSet));
  }
  return list;
};
