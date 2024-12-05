import { createTag, findByTag, getTagList } from '@/services/tags/api';
import { TagSchema } from '@/services/tags/schema';
import { createWord, findByWord, getWordList } from '@/services/words/api';
import { BaseWordSchema } from '@/services/words/schema';
import { z } from '@/zod';
import { mergeValues } from './form';
import { getTagDefaultValues } from '@/services/tags/utils';
import { filterWordsByTagIds, getWordDefaultValues } from '@/services/words/utils';
import { queryClient } from '@/services/queryClient';
import { QueryKey } from '@/services/constants';
import { DateTime } from 'luxon';
import FileSaver from 'file-saver';

const DEFAULT_FILE_VERSION = 1;

const ImportTagSchema = TagSchema.pick({ id: true, name: true });
type ImportTag = z.infer<typeof ImportTagSchema>;

const ImportWordSchema = BaseWordSchema.pick({ word: true, translate: true, transcription: true });
type ImportWord = z.infer<typeof ImportWordSchema>;

const ImportFileSchema = z.object({
  version: z.number(),
  tags: z.array(ImportTagSchema),
  words: z.array(ImportWordSchema),
});

interface ImportFile {
  version: number;
  tags: ImportTag[];
  words: ImportWord[];
}

const validateImportFile = (value: unknown): value is ImportFile => {
  const { error } = ImportFileSchema.safeParse(value);
  return !error;
};

export const importDataFromFile = async (data: unknown): Promise<boolean> => {
  const isValidFile = validateImportFile(data);
  if (isValidFile) {
    for (const tag of data.tags) {
      const isExistsTag: boolean = !!(await findByTag(tag.name));
      if (!isExistsTag) {
        await createTag(mergeValues(tag, getTagDefaultValues()), true);
      }
    }
    for (const word of data.words) {
      const isExistsWord: boolean = !!(await findByWord(word.word));
      if (!isExistsWord) {
        await createWord(mergeValues(word, getWordDefaultValues()), true);
      }
    }
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetTagList] });
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordList] });
    await queryClient.invalidateQueries({ queryKey: [QueryKey.GetWordTypeChoices] });
  }
  return isValidFile;
};

export const exportWordsToFile = async (tagIds: string[]): Promise<void> => {
  const allTags = await getTagList({});
  const tags = allTags.filter((tag) => tagIds.includes(tag.id));

  const allWords = await getWordList();
  const words = filterWordsByTagIds(allWords, tagIds);

  const filename = `dictionary_${DateTime.local().toFormat('yyyy_LL_dd_HH_mm')}.json`;
  const jsonData = JSON.stringify({ version: DEFAULT_FILE_VERSION, tags, words } satisfies ImportFile, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  FileSaver.saveAs(blob, filename);
};
