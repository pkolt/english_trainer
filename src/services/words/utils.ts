import { DateTime } from 'luxon';
import { Question, Word, WordType } from './types';
import { getRandomItemOfArray, shuffle } from '@/utils/random';

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
    return list.filter((it) => it.tags.length > 0 && !new Set(it.tags).isDisjointFrom(searchSet));
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

const QUESTIONS_MAX = 7;
const ANSWERS_MAX = 5;

export const makeQuestions = (words: Word[]): Question[] => {
  const questions: Question[] = [];
  const questionIds: string[] = [];

  for (let i = 0; i < QUESTIONS_MAX; i++) {
    const wordsForQuestions = words.filter((it) => !questionIds.includes(it.id));
    if (wordsForQuestions.length === 0) {
      break;
    }
    const word = getRandomItemOfArray(wordsForQuestions);
    questionIds.push(word.id);

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
