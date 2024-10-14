import { Form } from '@/components/Form';
import { createWord, readWord, updateWord } from '@/services/words';
import { WordSchema } from '@/services/words/schema';
import { Word } from '@/services/words/types';
import { Alert, AlertTitle, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import { DialogProps } from '@toolpad/core/useDialogs';
import CloseIcon from '@mui/icons-material/Close';
import { FormContent } from './FormContent';
import { getDefaultValues } from './utils';

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
        setDefaultValues(getDefaultValues());
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
            <>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  <AlertTitle>Произошла ошибка!</AlertTitle>
                  {error.message}
                </Alert>
              )}
              <FormContent />
            </>
          </Form>
        ) : (
          'Loading...'
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WordFormDialog;
