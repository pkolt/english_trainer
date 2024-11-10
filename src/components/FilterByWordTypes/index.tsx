import { useGetWordTypeChoices } from '@/services/words/hooks';
import { SelectField } from '../Form/SelectField';
import { WordType } from '@/services/words/types';

interface Props {
  value: WordType[];
  onChangeValue: (value: WordType[]) => void;
}

export const FilterByWordTypes = ({ value, onChangeValue }: Props) => {
  const { data: wordTypeChoices } = useGetWordTypeChoices();

  return (
    <SelectField
      label="Фильтр по типу"
      choices={wordTypeChoices ?? []}
      value={value}
      onChangeValue={onChangeValue}
      multiple
      size="small"
      sx={{ minWidth: '170px', maxWidth: '300px' }}
    />
  );
};
