import { z } from '@/zod';

export const SettingsSchema = z.object({
  voiceURI: z.string().min(1),
});

export type Settings = z.infer<typeof SettingsSchema>;
