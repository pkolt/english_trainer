import { useMutation, useQuery } from '@tanstack/react-query';
import { createWord, deleteWord, getWordList, readWord, updateWord } from './api';
import { QueryKey } from '../constants';

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
