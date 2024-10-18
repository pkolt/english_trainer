import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../queryClient';
import { Word } from './types';
import { QK_GET_WORD, QK_GET_WORD_LIST } from './constants';
import { createWord, deleteWord, getWordList, readWord, updateWord } from './api';

export const useGetWordList = () => {
  return useQuery({
    queryKey: [QK_GET_WORD_LIST],
    queryFn: () => getWordList(),
  });
};

export const useCreateWord = () => {
  return useMutation({
    mutationFn: async (data: Word) => {
      await createWord(data);
      queryClient.invalidateQueries({ queryKey: [QK_GET_WORD_LIST] });
    },
  });
};

export const useReadWord = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QK_GET_WORD, id],
    queryFn: () => readWord(id),
    enabled,
  });
};

export const useUpdateWord = () => {
  return useMutation({
    mutationFn: async (data: Word) => {
      await updateWord(data);
      queryClient.invalidateQueries({ queryKey: [QK_GET_WORD_LIST] });
      queryClient.invalidateQueries({ queryKey: [QK_GET_WORD, data.id] });
    },
  });
};

export const useDeleteWord = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteWord(id);
      queryClient.invalidateQueries({ queryKey: [QK_GET_WORD_LIST] });
    },
  });
};
