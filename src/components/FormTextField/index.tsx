import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

type Props = Parameters<typeof TextField>[0];

interface Choice {
  label: string;
  value: string;
}

export type Choices = Choice[];

interface FormTextFieldProps extends Props {
  name: string;
  choices?: Choices;
  multiple?: boolean;
}

export const FormTextField = ({ name, choices, multiple, ...props }: FormTextFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <TextField
            error={!!error}
            helperText={error?.message}
            ref={ref}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            select={!!choices}
            slotProps={{
              select: {
                multiple,
              },
            }}
            {...props}>
            {choices?.map((choice) => (
              <MenuItem key={choice.value} value={choice.value} onBlur={onBlur}>
                {choice.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
