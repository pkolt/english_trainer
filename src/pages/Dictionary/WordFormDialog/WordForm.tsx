import { Word } from '@/services/words/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fixOnlyEnglish, fixOnlyRussian } from '../../../utils/keyboard';
import { WordSchema } from '@/services/words/schema';
import { Button, Stack } from '@mui/material';
import { WORD_TYPE_CHOICES } from '../../../constants/form';
import { LoadingButton } from '@mui/lab';
import { useMemo } from 'react';
import { FormTextField } from '@/components/Form/FormTextField';
import { FormCheckboxField } from '@/components//Form/FormCheckboxField';
import { FormSelectField } from '@/components//Form/FormSelectField';
import { mergeValues } from '@/utils/form';
import { getWordDefaultValues } from '@/services/words/utils';
import { useGetTagList } from '@/services/tags/hooks';
import { Choice } from '@/types';

interface Props {
  word?: Word;
  onSubmit: (data: Word) => void;
}

export const WordForm = ({ word, onSubmit }: Props) => {
  const { data: tagList } = useGetTagList();

  const tagChoices = useMemo<Choice[]>(() => {
    return (tagList ?? []).map((it) => ({ label: it.name, value: it.id }));
  }, [tagList]);

  const defaultValues = useMemo(() => {
    const defVals = getWordDefaultValues();
    return word ? mergeValues(word, defVals) : defVals;
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
      <FormTextField control={control} name="word" label="Слово" transform={fixOnlyEnglish} autoFocus />
      <FormTextField control={control} name="translate" label="Перевод" transform={fixOnlyRussian} />
      <FormTextField control={control} name="transcription" label="Транскрипция" />
      <FormSelectField control={control} name="types" label="Тип" choices={WORD_TYPE_CHOICES} multiple />
      <FormSelectField control={control} name="tags" label="Теги" choices={tagChoices} multiple />
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
