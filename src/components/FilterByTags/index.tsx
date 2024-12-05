import { useGetTagList } from '@/services/tags/hooks';
import { SelectField } from '../Form/SelectField';
import { useMemo } from 'react';
import { TagWithCount } from '@/services/tags/types';
import { Choice } from '@/types';

const convertTagListToChoices = (tagList: TagWithCount[]): Choice[] => {
  return tagList.filter((it) => it.count > 0).map((it) => ({ label: it.name, value: it.id, count: it.count }));
};

interface Props {
  value: string[];
  onChangeValue: (value: string[]) => void;
}

export const FilterByTags = ({ value, onChangeValue }: Props) => {
  const { data: tagList } = useGetTagList({ emptyTag: true });

  const filterTagChoices = useMemo(() => {
    return convertTagListToChoices(tagList ?? []);
  }, [tagList]);

  return (
    <SelectField
      label="Фильтр по тегам"
      choices={filterTagChoices}
      value={value}
      onChangeValue={onChangeValue}
      multiple
      size="small"
      sx={{ minWidth: '170px', maxWidth: '300px' }}
    />
  );
};
