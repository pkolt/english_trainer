import { z } from '@/zod';
import { WordProgressSchema } from './schema';

export type WordProgress = z.infer<typeof WordProgressSchema>;
