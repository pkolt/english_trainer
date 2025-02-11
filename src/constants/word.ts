import { WordType } from '@/services/words/types';

export const WORD_TYPE_TO_NAME: Record<WordType, string> = {
  [WordType.Phrase]: 'Фраза',
  [WordType.Sentence]: 'Предложение',
  [WordType.Verb]: 'Глагол',
  [WordType.VerbPhrase]: 'Фразовый глагол',
  [WordType.VerbAuxiliary]: 'Вспомогательный глагол',
  [WordType.VerbModal]: 'Модальный глагол',
  [WordType.Adjective]: 'Прилагательное',
  [WordType.AdjectivePhrase]: 'Фразовое прилагательное',
  [WordType.Noun]: 'Существительное',
  [WordType.Pronoun]: 'Местоимение',
  [WordType.Adverb]: 'Наречие',
  [WordType.Abbreviature]: 'Аббревиатура',
  [WordType.Preposition]: 'Предлог',
  [WordType.PrepositionPhrase]: 'Предлог фраза',
  [WordType.Number]: 'Числительное',
  [WordType.Article]: 'Артикль',
  [WordType.Determiner]: 'Определитель',
  [WordType.Interjections]: 'Междометие',
  [WordType.Conjunction]: 'Союз',
  [WordType.Idiom]: 'Идиома',
};
