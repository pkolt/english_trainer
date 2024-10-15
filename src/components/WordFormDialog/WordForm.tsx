import { Word } from '@/services/words/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fixOnlyEnglish, fixOnlyRussian, getDefaultValues } from './utils';
import { WordSchema } from '@/services/words/schema';
import { Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField } from '@mui/material';
import { WORD_TYPE_CHOICES } from './constants';
import { LoadingButton } from '@mui/lab';
import { useMemo } from 'react';
import { FormTextField } from '../Form/FormTextField';

interface Props {
  word?: Word;
  onSubmit: (data: Word) => void;
}

export const WordForm = ({ word, onSubmit }: Props) => {
  const defaultValues = useMemo(() => (word ? word : getDefaultValues()), [word]);

  const {
    formState: { isDirty, isValid, isSubmitting, errors },
    handleSubmit,
    register,
    watch,
    reset,
    control,
  } = useForm<Word>({
    mode: 'onChange',
    resolver: zodResolver(WordSchema),
    defaultValues,
  });

  const example = watch('example');
  const favorite = watch('favorite');
  const type = watch('type');

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      inert={isSubmitting ? '' : undefined}
      marginTop={1}>
      <FormControlLabel control={<Checkbox checked={favorite} {...register('favorite')} />} label="Избранное" />
      <FormTextField control={control} name="text" label="Слово" transform={fixOnlyEnglish} autoFocus />
      <FormTextField control={control} name="translate" label="Перевод" transform={fixOnlyRussian} />
      <FormTextField control={control} name="transcription" label="Транскрипция" />
      <TextField
        label="Тип"
        value={type}
        select
        {...register('type')}
        error={!!errors['type']}
        helperText={errors['type']?.message}>
        {WORD_TYPE_CHOICES.map((choice) => (
          <MenuItem key={choice.value} selected={choice.value === type} value={choice.value}>
            {choice.label}
          </MenuItem>
        ))}
      </TextField>

      <FormTextField control={control} name="example" label="Пример" transform={fixOnlyEnglish} />
      {!!example && (
        <FormTextField control={control} name="exampleTranslate" label="Перевод примера" transform={fixOnlyRussian} />
      )}
      <Stack direction="row" spacing={2}>
        <LoadingButton variant="contained" type="submit" loading={isSubmitting} disabled={!isValid || !isDirty}>
          {word ? 'Сохранить' : 'Создать'}
        </LoadingButton>
        <Button variant="outlined" onClick={() => reset(defaultValues)} disabled={!isDirty}>
          Очистить
        </Button>
      </Stack>
    </Stack>
  );
};
