import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../constants';
import { getWordProgressList } from './api';

export const useGetWordProgressList = () =>
  useQuery({
    queryKey: [QueryKey.GetWordProgressList],
    queryFn: getWordProgressList,
  });
