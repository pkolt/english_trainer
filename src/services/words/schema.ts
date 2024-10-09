import { z } from 'zod';
import { WordType } from './types';

// Trainer
// trainingSkip?: boolean;
// trainingAt?: string;
// trainingCount?: number;

export const WordSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(WordType),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  text: z.string().trim(),
  translate: z.string().trim(),
  transcription: z.string().trim(),
  description: z.string().trim().optional(),
  examples: z.string().trim().optional(),

  // Noun
  uncountable: z.boolean().optional(),

  // Verb
  irregular: z.boolean().optional(),
  pastSimple: z.string().uuid().optional(),
  pastParticiple: z.string().uuid().optional(),
});
