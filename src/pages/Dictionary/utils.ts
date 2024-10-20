import { TagWithCount } from '@/services/tags/types';
import { Word, WordType } from '@/services/words/types';
import { Choice } from '@/types';

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
    return list.filter((it) => it.types.length > 0 && !new Set(it.types).isDisjointFrom(searchSet));
  }
  return list;
};

export const filterWordsByTagIds = (list: Word[], tagIds: string[]): Word[] => {
  if (tagIds.length > 0) {
    const searchSet = new Set(tagIds);
    return list.filter((it) => it.tags.length > 0 && !new Set(it.tags).isDisjointFrom(searchSet));
  }
  return list;
};

export const orderWordsByAbc = (list: Word[]): Word[] => {
  return list.toSorted((a, b) => a.word.localeCompare(b.word));
};

export const orderWordsByFavorite = (list: Word[]): Word[] => {
  return list.toSorted((a, b) => Number(b.favorite) - Number(a.favorite));
};

export const convertTagListToChoices = (tagList: TagWithCount[]): Choice[] => {
  return tagList.filter((it) => it.count > 0).map((it) => ({ label: it.name, value: it.id, count: it.count }));
};
