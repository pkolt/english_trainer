import { Choice, FormField } from '@/types';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  choices: Choice[];
  multiple?: boolean;
}

export const FormSelectField: FormField<Props & TextFieldProps> = ({ name, control, choices, multiple, ...props }) => {
  const orderedChoices = useMemo(() => choices.toSorted((a, b) => a.label.localeCompare(b.label)), [choices]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const { value } = field;
        return (
          <TextField
            select
            error={!!error}
            helperText={error?.message}
            slotProps={{
              select: {
                multiple,
              },
            }}
            {...props}
            {...field}>
            {orderedChoices.map((choice) => (
              <MenuItem key={choice.value} selected={choice.value === value} value={choice.value}>
                {choice.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
