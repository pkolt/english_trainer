import { Word } from '@/services/words/types';

export interface Question {
  question: Word;
  answers: Word[];
  userAnswer: Word | null;
}
