import { DateTime } from 'luxon';
import { Tag } from './types';

export const getTagDefaultValues = (): Tag => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    createdAt: today,
    updatedAt: today,
    name: '',
  };
};

export const renderTags = (tagIds: string[], tagList: Tag[]) => {
  return tagIds
    .map((tagId) => {
      const tag = tagList.find((it) => it.id === tagId);
      return tag?.name ?? 'Unknown';
    })
    .join(', ');
};
