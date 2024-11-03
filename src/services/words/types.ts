import { z } from '@/zod';
import { WordSchema } from './schema';

export enum WordType {
  Phrase = 'phrase',
  Sentence = 'sentence',
  Verb = 'verb',
  VerbPhrase = 'verb_phr',
  VerbAuxiliary = 'verb_aux',
  VerbModal = 'verb_modal',
  Adjective = 'adj',
  AdjectivePhrase = 'adj_phr',
  Noun = 'noun',
  Pronoun = 'pronoun',
  Adverb = 'adverb',
  Abbreviature = 'abbrev',
  Preposition = 'prep',
  PrepositionPhrase = 'prep_phrase',
  Number = 'number',
  Article = 'article',
  Determiner = 'determiner',
  Interjections = 'interj',
  Conjunction = 'conj',
  Idiom = 'idiom',
}

export type Word = z.infer<typeof WordSchema>;

export interface Question {
  question: Word;
  answers: Word[];
  userAnswer: Word | null;
}
