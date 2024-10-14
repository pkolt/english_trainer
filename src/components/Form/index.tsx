import { z } from '@/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import { FormProvider, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface FormProps<Schema extends ZodSchema, FormData extends z.infer<Schema>> {
  schema: Schema;
  onSubmit: SubmitHandler<FormData>;
  defaultValues: FormData;
  submitButtonText: string;
  children: (methods: UseFormReturn<FormData>) => JSX.Element;
}

export const Form = <Schema extends ZodSchema, FormData extends z.infer<Schema>>({
  children,
  schema,
  onSubmit,
  defaultValues,
  submitButtonText,
}: FormProps<Schema, FormData>) => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = methods;

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      inert={isSubmitting ? '' : undefined}
      marginTop={1}>
      {/* marginTop - Fix show label for top field */}
      <FormProvider {...methods}>
        {children(methods)}
        <Stack direction="row" spacing={2}>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting} disabled={!isValid || !isDirty}>
            {submitButtonText}
          </LoadingButton>
          <Button variant="outlined" onClick={() => reset(defaultValues)} disabled={!isDirty}>
            Очистить
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
