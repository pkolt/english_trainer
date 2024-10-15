import { createWord, readWord, updateWord } from '@/services/words/api';
import { Word } from '@/services/words/types';
import { Alert, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import { DialogProps } from '@toolpad/core/useDialogs';
import CloseIcon from '@mui/icons-material/Close';
import { getDefaultValues } from './utils';
import { WordForm } from './WordForm';

const WordFormDialog = ({ payload: id, open, onClose }: DialogProps<string | undefined>) => {
  const notifications = useNotifications();
  const [isLoading, setLoading] = useState(true);
  const [word, setWord] = useState<Word | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (data: Word) => {
      setErrorMsg(null); // Reset state
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
      } catch {
        setErrorMsg('Ошибка при сохранении данных!');
      }
    },
    [id, notifications, onClose],
  );

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const word = await readWord(id);
          if (!word) {
            throw new Error('Word not exists!');
          }
          setWord(word);
        } else {
          setWord(getDefaultValues());
        }
        setLoading(false);
      } catch {
        setErrorMsg('Ошибка при загрузки данных!');
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
        {errorMsg && (
          <Alert severity="error" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        )}
        {isLoading ? null : <WordForm word={word} onSubmit={onSubmit} />}
      </DialogContent>
    </Dialog>
  );
};

export default WordFormDialog;
