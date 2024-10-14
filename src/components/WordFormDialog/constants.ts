import { WordType } from '@/services/words/types';
import { Choices } from '../FormTextField';
import { WORD_TYPE_TO_NAME } from '@/constants/word';

export const WORD_TYPE_CHOICES: Choices = Object.values(WordType).map((value) => ({
  label: WORD_TYPE_TO_NAME[value],
  value,
}));
