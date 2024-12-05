import { DateTime } from 'luxon';
import { QuizItem, Word, WordType } from './types';
import { getRandomItemOfArray, shuffle } from '@/utils/random';
import { WORD_TYPE_TO_NAME } from '@/constants/word';
import { EMPTY_TAG_ID } from '../constants';

export const getWordDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    types: [],
    word: '',
    translate: '',
    transcription: '',
    description: '',
    example: '',
    exampleTranslate: '',
    note: '',
    favorite: false,
    tags: [],
  };
};

export const filterWordsByTagIds = (list: Word[], tagIds: string[]): Word[] => {
  if (tagIds.length > 0) {
    const searchSet = new Set(tagIds);
    return list.filter((it) => {
      const wordTagSet = new Set(it.tags.length === 0 ? [EMPTY_TAG_ID] : it.tags);
      return !wordTagSet.isDisjointFrom(searchSet);
    });
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

export const renderWordTypes = (values: WordType[]) => {
  return values.map((it) => WORD_TYPE_TO_NAME[it]).join(', ');
};

const QUESTIONS_MAX = 7;
const ANSWERS_MAX = 5;

export const makeQuizItems = (words: Word[]): QuizItem[] => {
  const questions: QuizItem[] = [];
  for (const word of words.slice(0, QUESTIONS_MAX)) {
    const answers: Word[] = [word];
    const answerIds: string[] = [word.id];
    for (let j = 0; j < ANSWERS_MAX - 1; j++) {
      const wordsForAnswers = words.filter((it) => !answerIds.includes(it.id));
      if (wordsForAnswers.length === 0) {
        break;
      }
      const answer = getRandomItemOfArray(wordsForAnswers);
      answers.push(answer);
      answerIds.push(answer.id);
    }

    questions.push({
      question: word,
      answers: shuffle(answers),
      userAnswer: null,
    });
  }
  return questions;
};

export const updateQuizItems = (items: QuizItem[], words: Word[]): QuizItem[] => {
  const wordsById = new Map<string, Word>();
  for (const word of words) {
    wordsById.set(word.id, word);
  }
  return items.map((item) => {
    return {
      question: wordsById.get(item.question.id) ?? item.question,
      answers: item.answers.map((answer) => wordsById.get(answer.id) ?? answer),
      userAnswer: wordsById.get(item.userAnswer?.id ?? '') ?? item.userAnswer,
    };
  });
};
