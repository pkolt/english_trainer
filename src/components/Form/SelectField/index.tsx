import { Choice } from '@/types';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  FormControlProps,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const getTitle = (choices: Choice[], value: unknown) => {
  const item = choices.find((it) => it.value === value);
  return item?.label;
};

const renderValue = (values: unknown[] | unknown, choices: Choice[]): string => {
  if (Array.isArray(values)) {
    return values
      .map((it) => getTitle(choices, it))
      .filter(Boolean)
      .join(', ');
  }
  return getTitle(choices, values) ?? '';
};

type SelectFieldProps<T> = {
  label: string;
  choices: Choice[];
  multiple?: boolean;
  value: T;
  onChangeValue(value: T): void;
} & FormControlProps;

export const SelectField = <T extends unknown[] | unknown>({
  choices,
  multiple,
  onChangeValue,
  ...props
}: SelectFieldProps<T>) => {
  const { value, label } = props;
  const orderedChoices = choices.toSorted((a, b) => a.label.localeCompare(b.label));
  const handleOnChange = (event: SelectChangeEvent<T>) => {
    onChangeValue(event.target.value as unknown as T);
  };

  return (
    <FormControl {...props}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={value}
        onChange={handleOnChange}
        input={<OutlinedInput label={label} />}
        renderValue={(values: T) => renderValue(values, choices)}>
        {orderedChoices.map((it) => {
          const selected = Array.isArray(value) ? value.includes(it.value) : value === it.value;
          const countText = it.count !== undefined ? `(${it.count})` : '';
          const title = [it.label, countText].join(' ');
          return (
            <MenuItem key={it.value} value={it.value}>
              <Checkbox checked={selected} />
              <ListItemText primary={title} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
