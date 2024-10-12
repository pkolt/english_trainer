import { z } from 'zod';
import { WordSchema } from './schema';

// [
//   'Part of speech', 'number',
//   'n',              'v',
//   'adj',            'country',
//   'phr',            'phr v',
//   'abbrev',         'pronoun',
//   'adv',            'article',
//   'n pl',           'n plural',
//   'prep',           'determiner',
//   'phrasal v',      'v phr',
//   'n sing',         'n ',
//   'aux',            'prep phr',
//   'interj'
// ]

// [
//   'Part of speech', 'n',
//   'v',              'modal verb',
//   'det, pronoun',   'adj',
//   'n pl',           'pronoun',
//   'phr v',          'v phr',
//   'adv',            'phr',
//   'prep',           'adv, adj',
//   'prep, adv',      'det',
//   'number, adj',    'n phr',
//   '',               'conj',
//   'adv, prep',      'prep phr'
// ]

// [
//   'Part of Speech',
//   'n',
//   'v',
//   'n phr',
//   'adv',
//   'n ',
//   'phr v',
//   'v phr',
//   'adj',
//   'det',
//   'n pl'
// ]

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
