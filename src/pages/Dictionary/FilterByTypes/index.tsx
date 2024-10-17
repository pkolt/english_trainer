import { WORD_TYPE_TO_NAME } from '@/constants/word';
import { WordType } from '@/services/words/types';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ChoiceWithCount, getFilterChoices } from './utils';

const LABEL = 'Фильтр по типу';

interface Props {
  value: WordType[];
  onChange: (value: WordType[]) => void;
}

export const FilterByTypes = ({ value, onChange }: Props) => {
  const [choices, setChoices] = useState<ChoiceWithCount[]>([]);

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<WordType[]>) => {
      onChange(event.target.value as unknown as WordType[]);
    },
    [onChange],
  );

  useEffect(() => {
    getFilterChoices().then(setChoices);
  }, []);

  return (
    <FormControl size="small" sx={{ minWidth: '170px', maxWidth: '300px' }}>
      <InputLabel>{LABEL}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleOnChange}
        input={<OutlinedInput label={LABEL} />}
        renderValue={(selected) => selected.map((it) => WORD_TYPE_TO_NAME[it]).join(', ')}>
        {choices.map((it) => {
          const selected = value.includes(it.value as unknown as WordType);
          return (
            <MenuItem key={it.value} value={it.value}>
              <Checkbox checked={selected} />
              <ListItemText primary={`${it.label} (${it.count})`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
