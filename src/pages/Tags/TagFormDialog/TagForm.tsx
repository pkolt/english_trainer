import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { mergeValues } from '@/utils/form';
import { Tag } from '@/services/tags/types';
import { TagSchema } from '@/services/tags/schema';
import { getTagDefaultValues } from '@/services/tags/utils';
import { FormTextField } from '@/components/Form/FormTextField';

interface Props {
  tag?: Tag;
  onSubmit: (data: Tag) => void;
}

export const TagForm = ({ tag, onSubmit }: Props) => {
  const defaultValues = (() => {
    const defVals = getTagDefaultValues();
    return tag ? mergeValues(tag, defVals) : defVals;
  })();

  const {
    formState: { isDirty, isValid, isSubmitting },
    handleSubmit,
    reset,
    control,
  } = useForm<Tag>({
    mode: 'onChange',
    resolver: zodResolver(TagSchema),
    defaultValues,
  });

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} inert={isSubmitting} marginTop={1}>
      <FormTextField control={control} name="name" label="Название" autoFocus />
      <Stack direction="row" spacing={2}>
        <LoadingButton variant="contained" type="submit" loading={isSubmitting} disabled={!isValid || !isDirty}>
          {tag ? 'Сохранить' : 'Создать'}
        </LoadingButton>
        <Button variant="outlined" onClick={() => reset(defaultValues)} disabled={!isDirty}>
          Очистить
        </Button>
      </Stack>
    </Stack>
  );
};
