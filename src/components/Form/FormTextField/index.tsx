import { FormField } from '@/types';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface Props {
  setRefInput?: (elem: HTMLInputElement | null) => void;
}

export const FormTextField: FormField<Props & MUITextFieldProps> = ({ name, control, setRefInput, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <MUITextField
            error={!!error}
            helperText={error?.message}
            {...props}
            {...field}
            inputRef={(elem: HTMLInputElement | null) => {
              field.ref(elem);
              if (setRefInput) {
                setRefInput(elem);
              }
            }}
          />
        );
      }}
    />
  );
};
