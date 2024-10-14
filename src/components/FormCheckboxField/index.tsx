import { SimpleObject } from '@/types';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller, useFormContext } from 'react-hook-form';

type FormCheckboxFieldProps<T extends SimpleObject> = {
  name: keyof T;
  label: string;
} & CheckboxProps;

export const FormCheckboxField = <T extends SimpleObject>({ name, label, ...props }: FormCheckboxFieldProps<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <FormControlLabel label={label} control={<Checkbox {...field} {...props} />} />;
      }}
    />
  );
};
