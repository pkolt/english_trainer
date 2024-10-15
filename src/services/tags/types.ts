import { z } from '@/zod';
import { TagSchema } from './schema';

export type Tag = z.infer<typeof TagSchema>;
