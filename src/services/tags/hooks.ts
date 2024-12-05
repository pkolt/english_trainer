import { useMutation, useQuery } from '@tanstack/react-query';
import { createTag, deleteTag, getTagList, GetTagListParams, readTag, updateTag } from './api';
import { QueryKey } from '../constants';

export const useGetTagList = (params: GetTagListParams = {}) =>
  useQuery({
    queryKey: [QueryKey.GetTagList, params],
    queryFn: () => getTagList(params),
  });

export const useCreateTag = () =>
  useMutation({
    mutationFn: createTag,
  });

export const useReadTag = (id: string, skipQuery?: boolean) =>
  useQuery({
    queryKey: [QueryKey.GetTag, id],
    queryFn: () => readTag(id),
    enabled: !skipQuery,
  });

export const useUpdateTag = () =>
  useMutation({
    mutationFn: updateTag,
  });

export const useDeleteTag = () =>
  useMutation({
    mutationFn: (id: string) => deleteTag(id),
  });
