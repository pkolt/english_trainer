import { Form } from '@/components/Form';
import { Choices, FormTextField } from '@/components/FormTextField';
import { createWord, readWord, updateWord } from '@/services/words';
import { WordSchema } from '@/services/words/schema';
import { Word, WordType } from '@/services/words/types';
import { Alert, AlertTitle, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import { WORD_TYPE_TO_NAME } from '@/constants/word';
import { useNotifications } from '@toolpad/core/useNotifications';
import { DialogProps } from '@toolpad/core/useDialogs';
import CloseIcon from '@mui/icons-material/Close';

const WORD_TYPE_CHOICES: Choices = Object.values(WordType).map((value) => ({ label: WORD_TYPE_TO_NAME[value], value }));

const makeDefaultValues = (): Word => {
  const today = DateTime.utc().toISO();
  return {
    id: window.crypto.randomUUID(),
    type: [WordType.Noun],
    createdAt: today,
    updatedAt: today,
    text: '',
    translate: '',
    pronunciation: '',
  };
};

const WordFormDialog = ({ payload: id, open, onClose }: DialogProps<string | undefined>) => {
  const notifications = useNotifications();
  const [defaultValues, setDefaultValues] = useState<Word | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = useCallback(
    async (data: Word) => {
      setError(null); // Reset state
      try {
        if (id) {
          await updateWord({ ...data, updatedAt: DateTime.utc().toISO() });
          onClose();
        } else {
          await createWord(data);
          notifications.show('Новое слово добавлено!', {
            severity: 'success',
            autoHideDuration: 3000,
          });
          onClose();
        }
      } catch (error) {
        setError(error as Error);
      }
    },
    [id, notifications, onClose],
  );

  useEffect(() => {
    (async () => {
      if (id) {
        const word = await readWord(id);
        if (word) {
          setDefaultValues(word);
        }
      } else {
        setDefaultValues(makeDefaultValues());
      }
    })();
  }, [id]);

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        {id ? 'Изменить' : 'Добавить'} слово
        <IconButton sx={{ ml: 'auto' }} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {defaultValues ? (
          <Form
            schema={WordSchema}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            submitButtonText={id ? 'Сохранить' : 'Создать'}>
            {() => (
              <>
                {error && (
                  <Alert severity="error" onClose={() => setError(null)}>
                    <AlertTitle>Произошла ошибка!</AlertTitle>
                    {error.message}
                  </Alert>
                )}
                <FormTextField name="text" label="Слово" autoFocus />
                <FormTextField name="type" label="Часть речи" choices={WORD_TYPE_CHOICES} multiple />
                <FormTextField name="translate" label="Перевод" />
                <FormTextField name="pronunciation" label="Транскрипция" />
                {/* {type === WordType.Verb && <></>} */}
              </>
            )}
          </Form>
        ) : (
          'Loading...'
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WordFormDialog;
