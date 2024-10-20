import { z } from '@/zod';
import { Word, WordType } from './types';
import { findAllByWord } from './api';

// Trainer
// trainingSkip?: boolean;
// trainingAt?: string;
// trainingCount?: number;

type IssuePath = keyof Word;

export const BaseWordSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  types: z.array(z.nativeEnum(WordType)),
  word: z.string().min(1).trim(),
  translate: z.string().min(1).trim(),
  transcription: z.string().trim(),
  description: z.string().trim(),
  example: z.string().trim(),
  exampleTranslate: z.string().trim(),
  note: z.string().trim(),
  favorite: z.boolean(),
  tags: z.array(z.string().uuid()),

  // Noun
  uncountable: z.boolean().optional(),

  // Verb
  irregular: z.boolean().optional(),
  pastSimple: z.string().uuid().optional(),
  pastParticiple: z.string().uuid().optional(),
});

export const WordSchema = BaseWordSchema.superRefine(async (obj, ctx) => {
  const { id, word, types } = obj;
  const words = await findAllByWord(obj.word);
  const isDuplicate = words?.some(
    (it) => it.id !== id && it.word === word && !new Set(it.types).isDisjointFrom(new Set(types)),
  );
  if (isDuplicate) {
    ctx.addIssue({
      path: ['word' satisfies IssuePath],
      code: z.ZodIssueCode.custom,
      message: 'Такое слово уже существует в словаре',
    });
    ctx.addIssue({
      path: ['types' satisfies IssuePath],
      code: z.ZodIssueCode.custom,
      message: 'Слово с таким типом уже существует',
    });
  }
});
