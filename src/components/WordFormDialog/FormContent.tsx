import { Word } from '@/services/words/types';
import { FormTextField } from '../FormTextField';
import { WORD_TYPE_CHOICES } from './constants';
import { useWatch } from 'react-hook-form';
import { fixOnlyEnglish, fixOnlyRussian } from '../FormTextField/utils';

export const FormContent = () => {
  const values = useWatch<Word>();
  return (
    <>
      <FormTextField<Word> name="text" label="Слово" autoFocus transform={fixOnlyEnglish} />
      <FormTextField<Word> name="translate" label="Перевод" transform={fixOnlyRussian} />
      <FormTextField<Word> name="transcription" label="Транскрипция" />
      <FormTextField<Word> name="type" label="Тип" choices={WORD_TYPE_CHOICES} />
      <FormTextField<Word> name="example" label="Пример" transform={fixOnlyEnglish} />
      {!!values.example && (
        <FormTextField<Word> name="exampleTranslate" label="Перевод примера" transform={fixOnlyRussian} />
      )}
      {/* {type === WordType.Verb && <></>} */}
    </>
  );
};
