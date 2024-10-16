import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@toolpad/core/useDialogs';
import { ImportWordsForm } from './ImportWordsForm';

export const ImportWordsDialog = ({ open, onClose }: DialogProps) => {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        Импортировать слова
        <IconButton sx={{ ml: 'auto' }} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ImportWordsForm />
      </DialogContent>
    </Dialog>
  );
};
