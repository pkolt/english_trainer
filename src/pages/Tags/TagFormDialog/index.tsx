import { Alert, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DialogProps } from '@toolpad/core/useDialogs';
import CloseIcon from '@mui/icons-material/Close';
import { useNotifications } from '@toolpad/core';
import { useCreateTag, useReadTag, useUpdateTag } from '@/services/tags/hooks';
import { TagForm } from './TagForm';
import { Tag } from '@/services/tags/types';
import { DateTime } from 'luxon';

type Props = DialogProps<string | undefined>;

export const TagFormDialog = ({ payload: id, open, onClose }: Props) => {
  const notifications = useNotifications();
  const { data: tag, isLoading, error: readError } = useReadTag(id!, !id);
  const { mutateAsync: createTag, error: createError } = useCreateTag();
  const { mutateAsync: updateTag, error: updateError } = useUpdateTag();

  const error = readError || createError || updateError;

  const onSubmit = async (data: Tag) => {
    if (id) {
      await updateTag({ ...data, updatedAt: DateTime.utc().toISO() });
    } else {
      await createTag(data);
      notifications.show('Новый тег добавлен!', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    }
    onClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        {id ? 'Изменить' : 'Добавить'} тег
        <IconButton sx={{ ml: 'auto' }} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error.message}</Alert>}
        {isLoading ? null : <TagForm tag={tag} onSubmit={onSubmit} />}
      </DialogContent>
    </Dialog>
  );
};
