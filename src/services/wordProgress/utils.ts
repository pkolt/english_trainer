import { DateTime } from 'luxon';
import { Question } from '../words/types';
import { findWordProgressByWord, updateWordProgress } from './api';
import { WordProgress } from './types';
import { mergeValues } from '@/utils/form';

export const getWordProgressDefaultValues = (wordId: string): WordProgress => {
  const today = DateTime.utc().toMillis();
  return {
    id: window.crypto.randomUUID(),
    word: wordId,
    wordToTransScore: 0,
    wordToTransUpdatedAt: today,
  };
};

export const saveWordProgressList = async (questions: Question[]): Promise<void> => {
  for (const { question: word, userAnswer } of questions) {
    const isRightAnswer = word.id === userAnswer?.id;
    const wordProgress = (await findWordProgressByWord(word.id)) ?? getWordProgressDefaultValues(word.id);
    const obj: WordProgress = mergeValues(wordProgress, getWordProgressDefaultValues(word.id));
    obj.wordToTransScore += isRightAnswer ? 1 : -1;
    obj.wordToTransUpdatedAt = DateTime.utc().toMillis();
    await updateWordProgress(obj);
  }
};
