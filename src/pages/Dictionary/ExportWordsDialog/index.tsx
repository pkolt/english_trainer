import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@toolpad/core/useDialogs';
import { ExportWordsForm } from './ExportWordsForm';

export const ExportWordsDialog = ({ open, onClose }: DialogProps) => {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        Экспортировать слова
        <IconButton sx={{ ml: 'auto' }} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ExportWordsForm />
      </DialogContent>
    </Dialog>
  );
};
