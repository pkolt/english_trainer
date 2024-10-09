import { WordType } from '@/services/words/types';

export const WORD_TYPE_TO_NAME: Record<WordType, string> = {
  [WordType.Phrase]: 'Фраза',
  [WordType.Sentence]: 'Предложение',
  [WordType.Verb]: 'Глагол',
  [WordType.Adjective]: 'Прилагательное',
  [WordType.Noun]: 'Существительное',
  [WordType.Pronoun]: 'Местоимение',
  [WordType.Adverb]: 'Наречие',
};
