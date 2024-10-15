import { Choice, FormField } from '@/types';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
  choices: Choice[];
}

export const FormSelectField: FormField<Props & TextFieldProps> = ({ name, control, choices, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const { value } = field;
        return (
          <TextField label="Тип" select error={!!error} helperText={error?.message} {...props} {...field}>
            {choices.map((choice) => (
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
