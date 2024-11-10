import { Word } from '@/services/words/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WordSchema } from '@/services/words/schema';
import { Button, Stack } from '@mui/material';
import { WORD_TYPE_CHOICES } from '@/constants/form';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo } from 'react';
import { FormTextField } from '@/components/Form/FormTextField';
import { FormCheckboxField } from '@/components//Form/FormCheckboxField';
import { FormSelectField } from '@/components//Form/FormSelectField';
import { mergeValues } from '@/utils/form';
import { getWordDefaultValues } from '@/services/words/utils';
import { useGetTagList } from '@/services/tags/hooks';
import { Choice } from '@/types';
import { TranscriptionKeyboard } from '../TranscriptionKeyboard';
import { useInputCursorPosition } from '@/hooks/useInputCursorPosition';

interface Props {
  word?: Word;
  onSubmit: (data: Word) => void;
}

export const WordForm = ({ word, onSubmit }: Props) => {
  const { data: tagList } = useGetTagList();
  const inputCursorPosition = useInputCursorPosition();

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
    setValue,
  } = useForm<Word>({
    mode: 'onChange',
    resolver: zodResolver(WordSchema),
    defaultValues,
  });

  const example = watch('example');
  const transcription = watch('transcription');

  const handleClickTransKey = useCallback(
    (value: string) => {
      const nextValue = transcription.split('').toSpliced(inputCursorPosition.position, 0, value).join('');
      setValue('transcription', nextValue, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [transcription, inputCursorPosition.position, setValue],
  );

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      inert={isSubmitting ? '' : undefined}
      marginTop={1}>
      <FormCheckboxField control={control} name="favorite" label="Избранное" />
      <FormTextField control={control} name="word" label="Слово" autoFocus />
      <FormTextField control={control} name="translate" label="Перевод" />
      <FormTextField
        control={control}
        name="transcription"
        label="Транскрипция"
        setRefInput={inputCursorPosition.setInputRef}
      />
      <TranscriptionKeyboard onClick={handleClickTransKey} />
      <FormSelectField control={control} name="types" label="Тип" choices={WORD_TYPE_CHOICES} multiple />
      <FormSelectField control={control} name="tags" label="Теги" choices={tagChoices} multiple />
      <FormTextField control={control} name="example" label="Пример" />
      {!!example && <FormTextField control={control} name="exampleTranslate" label="Перевод примера" />}
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
