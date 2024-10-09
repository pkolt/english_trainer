import { z } from 'zod';
import { WordSchema } from './schema';

export enum WordType {
  Phrase = 'phrase',
  Sentence = 'sentence',
  Verb = 'verb',
  Adjective = 'adj',
  Noun = 'noun',
  Pronoun = 'pronoun',
  Adverb = 'adverb',
}

export type Word = z.infer<typeof WordSchema>;
