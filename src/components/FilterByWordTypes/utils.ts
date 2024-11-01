import { Word, WordType } from '@/services/words/types';

export const filterWordsByTypes = (list: Word[], types: WordType[]): Word[] => {
  if (types.length > 0) {
    const searchSet = new Set(types);
    return list.filter((it) => it.types.length > 0 && !new Set(it.types).isDisjointFrom(searchSet));
  }
  return list;
};
