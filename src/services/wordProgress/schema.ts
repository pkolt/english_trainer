import { z } from '@/zod';

export const WordProgressSchema = z.object({
  id: z.string().uuid(),
  word: z.string().uuid(),
  wordToTransScore: z.number(),
  wordToTransUpdatedAt: z.number(),
});
