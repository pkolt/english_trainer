import { useQuery } from '@tanstack/react-query';
import { QK_GET_TAG_LIST } from './constants';
import { getTagList } from './api';

export const useGetTagList = () => {
  return useQuery({
    queryKey: [QK_GET_TAG_LIST],
    queryFn: () => getTagList(),
  });
};
