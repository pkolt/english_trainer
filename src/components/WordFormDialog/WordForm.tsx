import { Word } from '@/services/words/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fixOnlyEnglish, fixOnlyRussian, getDefaultValues } from './utils';
import { WordSchema } from '@/services/words/schema';
import { Button, Stack } from '@mui/material';
import { WORD_TYPE_CHOICES } from './constants';
import { LoadingButton } from '@mui/lab';
import { useMemo } from 'react';
import { FormTextField } from '../Form/FormTextField';
import { FormCheckboxField } from '../Form/FormCheckboxField';
import { FormSelectField } from '../Form/FormSelectField';
import { mergeDefaultValues } from '@/utils';

interface Props {
  word?: Word;
  onSubmit: (data: Word) => void;
}

export const WordForm = ({ word, onSubmit }: Props) => {
  const defaultValues = useMemo(() => {
    const defVals = getDefaultValues();
    return word ? mergeDefaultValues(word, defVals) : defVals;
  }, [word]);

  const {
    formState: { isDirty, isValid, isSubmitting },
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm<Word>({
    mode: 'onChange',
    resolver: zodResolver(WordSchema),
    defaultValues,
  });

  const example = watch('example');

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      inert={isSubmitting ? '' : undefined}
      marginTop={1}>
      <FormCheckboxField control={control} name="favorite" label="Избранное" />
      <FormTextField control={control} name="text" label="Слово" transform={fixOnlyEnglish} autoFocus />
      <FormTextField control={control} name="translate" label="Перевод" transform={fixOnlyRussian} />
      <FormTextField control={control} name="transcription" label="Транскрипция" />
      <FormSelectField control={control} name="type" label="Тип" choices={WORD_TYPE_CHOICES} />
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
