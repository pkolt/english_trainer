import { z } from 'zod';
import { WordType } from './types';
import { findByWord } from '.';

// Trainer
// trainingSkip?: boolean;
// trainingAt?: string;
// trainingCount?: number;

export const WordSchema = z
  .object({
    id: z.string().uuid(),
    type: z.nativeEnum(WordType),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    text: z.string().min(1).trim(),
    translate: z.string().min(1).trim(),
    transcription: z.string().trim(),
    description: z.string().trim().optional(),
    examples: z.string().trim().optional(),

    // Noun
    uncountable: z.boolean().optional(),

    // Verb
    irregular: z.boolean().optional(),
    pastSimple: z.string().uuid().optional(),
    pastParticiple: z.string().uuid().optional(),
  })
  .superRefine(async (obj, ctx) => {
    const word = await findByWord(obj.text);
    if (word && word.id !== obj.id) {
      ctx.addIssue({
        path: ['text'],
        code: z.ZodIssueCode.custom,
        message: 'Такое слово уже существует в словаре',
      });
    }
  });
