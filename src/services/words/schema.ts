import { z } from '@/zod';
import { WordType } from './types';
import { findByWord } from '.';

// Trainer
// trainingSkip?: boolean;
// trainingAt?: string;
// trainingCount?: number;

export const WordSchema = z
  .object({
    id: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    type: z.nativeEnum(WordType),
    text: z.string().min(1).trim(),
    translate: z.string().min(1).trim(),
    transcription: z.string().trim(),
    description: z.string().trim(),
    example: z.string().trim(),
    exampleTranslate: z.string().trim(),
    note: z.string().trim(),
    favorite: z.boolean(),

    // Noun
    uncountable: z.boolean().optional(),

    // Verb
    irregular: z.boolean().optional(),
    pastSimple: z.string().uuid().optional(),
    pastParticiple: z.string().uuid().optional(),
  })
  .superRefine(async (obj, ctx) => {
    const { id, text, type } = obj;
    const words = await findByWord(obj.text);
    const isMatch = words?.some((it) => it.id !== id && it.text === text && it.type === type);
    if (isMatch) {
      ctx.addIssue({
        path: ['text'],
        code: z.ZodIssueCode.custom,
        message: 'Такое слово уже существует в словаре',
      });
      ctx.addIssue({
        path: ['type'],
        code: z.ZodIssueCode.custom,
        message: 'Слово с таким типом уже существует',
      });
    }
  });
