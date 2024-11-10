import { FormField } from '@/types';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export const FormTextField: FormField<MUITextFieldProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return <MUITextField error={!!error} helperText={error?.message} {...props} {...field} />;
      }}
    />
  );
};
