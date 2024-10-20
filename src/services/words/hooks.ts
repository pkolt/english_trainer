import { useMutation, useQuery } from '@tanstack/react-query';
import { createWord, deleteWord, getCountWordByType, getWordList, readWord, updateWord } from './api';
import { QueryKey } from '../constants';
import { WORD_TYPE_CHOICES } from '@/constants/form';
import { WordType } from './types';
import { Choice } from '@/types';

export const useGetWordList = () =>
  useQuery({
    queryKey: [QueryKey.GetWordList],
    queryFn: getWordList,
  });

export const useCreateWord = () =>
  useMutation({
    mutationFn: createWord,
  });

export const useReadWord = (id: string, skipQuery?: boolean) =>
  useQuery({
    queryKey: [QueryKey.GetWord, id],
    queryFn: () => readWord(id),
    enabled: !skipQuery,
  });

export const useUpdateWord = () =>
  useMutation({
    mutationFn: updateWord,
  });

export const useDeleteWord = () =>
  useMutation({
    mutationFn: deleteWord,
  });

export const useGetWordTypeChoices = () =>
  useQuery({
    queryKey: [QueryKey.GetWordTypeChoices],
    queryFn: async () => {
      const list: Choice[] = [];
      for (const it of WORD_TYPE_CHOICES) {
        const count = await getCountWordByType(it.value as unknown as WordType);
        if (count > 0) {
          list.push({ ...it, count });
        }
      }
      return list;
    },
  });
