import { Word } from '@/services/words/types';

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

export const orderWordsByAbc = (list: Word[]): Word[] => {
  return list.toSorted((a, b) => a.word.localeCompare(b.word));
};

export const orderWordsByFavorite = (list: Word[]): Word[] => {
  return list.toSorted((a, b) => Number(b.favorite) - Number(a.favorite));
};
