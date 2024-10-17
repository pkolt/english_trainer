import { Word, WordType } from '@/services/words/types';

export const filterWordsBySearchText = (list: Word[], searchText: string): Word[] => {
  const value = searchText.trim().toLowerCase();
  if (value) {
    if (value.length < 3) {
      return list.filter((it) => it.word.toLowerCase() === value || it.translate.toLowerCase() === value);
    } else {
      return list.filter((it) => it.word.toLowerCase().includes(value) || it.translate.toLowerCase().includes(value));
    }
  }
  return list;
};

export const filterWordsByTypes = (list: Word[], types: WordType[]): Word[] => {
  if (types.length > 0) {
    const searchSet = new Set(types);
    return list.filter((it) => it.types.length > 0 && new Set(it.types).isSubsetOf(searchSet));
  }
  return list;
};
