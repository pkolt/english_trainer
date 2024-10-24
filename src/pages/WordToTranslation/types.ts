import { Word } from '@/services/words/types';

export interface Step {
  word: Word;
  answers: Word[];
  userAnswer: Word | null;
}
