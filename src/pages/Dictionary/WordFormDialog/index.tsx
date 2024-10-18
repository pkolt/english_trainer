import { Word } from '@/services/words/types';
import { Alert, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import { DialogProps } from '@toolpad/core/useDialogs';
import CloseIcon from '@mui/icons-material/Close';
import { WordForm } from './WordForm';
import { useCreateWord, useReadWord, useUpdateWord } from '@/services/words/hooks';

const WordFormDialog = ({ payload: id, open, onClose }: DialogProps<string | undefined>) => {
  const notifications = useNotifications();
  const { data: word, isLoading, error: readError } = useReadWord(id!, !!id);
  const { mutateAsync: createWord, error: createError } = useCreateWord();
  const { mutateAsync: updateWord, error: updateError } = useUpdateWord();

  const error = readError || createError || updateError;

  const onSubmit = useCallback(
    async (data: Word) => {
      if (id) {
        await updateWord({ ...data, updatedAt: DateTime.utc().toISO() });
      } else {
        await createWord(data);
        notifications.show('Новое слово добавлено!', {
          severity: 'success',
          autoHideDuration: 3000,
        });
      }
      onClose();
    },
    [createWord, id, notifications, onClose, updateWord],
  );

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        {id ? 'Изменить' : 'Добавить'} слово
        <IconButton sx={{ ml: 'auto' }} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error.message}</Alert>}
        {isLoading ? null : <WordForm word={word} onSubmit={onSubmit} />}
      </DialogContent>
    </Dialog>
  );
};

export default WordFormDialog;
