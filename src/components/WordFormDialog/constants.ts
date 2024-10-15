import { WordType } from '@/services/words/types';
import { WORD_TYPE_TO_NAME } from '@/constants/word';
import { Choice } from '@/types';

export const WORD_TYPE_CHOICES: Choice[] = Object.values(WordType).map((value) => ({
  label: WORD_TYPE_TO_NAME[value],
  value,
}));
