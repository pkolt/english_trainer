import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface Props {
  label?: string;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  onSelect: (value: FileList) => void;
}

export const FileUploadButton = ({ label, multiple, accept, onSelect, disabled }: Props) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={disabled}>
      {label}
      <VisuallyHiddenInput
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.files;
          if (value) {
            onSelect(value);
          }
        }}
      />
    </Button>
  );
};
