import { FormField } from '@/types';
import { FormControlLabel, Checkbox, CheckboxProps } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
  label: string;
}

export const FormCheckboxField: FormField<Props & CheckboxProps> = ({ name, control, label, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { value } = field;
        return <FormControlLabel label={label} control={<Checkbox checked={!!value} {...field} {...props} />} />;
      }}
    />
  );
};
