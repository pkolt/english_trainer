import { WORD_TYPE_CHOICES } from '@/constants/form';
import { getCountWordByType } from '@/services/words/api';
import { WordType } from '@/services/words/types';
import { Choice } from '@/types';

export interface ChoiceWithCount extends Choice {
  count: number;
}

export const getFilterChoices = async () => {
  const list: ChoiceWithCount[] = [];
  for (const it of WORD_TYPE_CHOICES) {
    const count = await getCountWordByType(it.value as unknown as WordType);
    if (count > 0) {
      list.push({ ...it, count });
    }
  }
  return list;
};
