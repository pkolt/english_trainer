import { DateTime, Interval } from 'luxon';
import { Question, Word } from '../words/types';
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

export const filterWordListByTodayProgress = (wordList: Word[], wordProgressList: WordProgress[]): Word[] => {
  const start = DateTime.utc().startOf('day');
  const end = DateTime.utc().endOf('day');
  const interval = Interval.fromDateTimes(start, end);
  const wordIds: string[] = [];
  for (const progress of wordProgressList) {
    const date = DateTime.fromMillis(progress.wordToTransUpdatedAt, { zone: 'utc' });
    if (interval.contains(date)) {
      wordIds.push(progress.word);
    }
  }
  return wordList.filter((it) => !wordIds.includes(it.id));
};

export const sortWordListByProgress = (wordList: Word[], wordProgressList: WordProgress[]): Word[] => {
  const scores = new Map<string, number>();
  for (const wordProgress of wordProgressList) {
    scores.set(wordProgress.word, wordProgress.wordToTransScore);
  }
  return [...wordList].sort((a, b) => {
    return (scores.get(a.id) ?? 0) - (scores.get(b.id) ?? 0);
  });
};
