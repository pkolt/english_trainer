import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

type Props = Parameters<typeof TextField>[0];

interface Choice {
  label: string;
  value: string;
}

export type Choices = Choice[];

type SimpleObject = Record<string, unknown>;

type FormTextFieldProps<T extends SimpleObject> = {
  name: keyof T;
  choices?: Choices;
  multiple?: boolean;
  // https://github.com/react-hook-form/react-hook-form/issues/10802
  transform?: (value: string) => string;
} & Props;

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const FormTextField = <T extends SimpleObject>({
  name,
  choices,
  multiple,
  transform,
  ...props
}: FormTextFieldProps<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        const handleChange = (event: ChangeEvent) => {
          onChange(transform ? transform(event.target.value) : event);
        };
        return (
          <TextField
            error={!!error}
            helperText={error?.message}
            ref={ref}
            value={value ?? ''}
            onChange={handleChange}
            onBlur={onBlur}
            select={!!choices}
            slotProps={{
              select: {
                multiple,
              },
            }}
            {...props}>
            {choices?.map((choice) => (
              <MenuItem key={choice.value} value={choice.value}>
                {choice.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
