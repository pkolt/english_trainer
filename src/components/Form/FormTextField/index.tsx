import { FormField } from '@/types';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface Props {
  transform?: (value: string) => string;
}

export const FormTextField: FormField<Props & MUITextFieldProps> = ({ name, control, transform, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange } = field;
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(transform ? transform(event.target.value) : event);
        };
        return (
          <MUITextField error={!!error} helperText={error?.message} {...props} {...field} onChange={handleChange} />
        );
      }}
    />
  );
};
