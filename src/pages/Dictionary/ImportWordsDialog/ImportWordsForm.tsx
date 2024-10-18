import { Alert, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { FileUploadButton } from '@/components/Form/FileUploadButton';
import { importDataFromFile } from '@/utils/file';
import { queryClient } from '@/services/queryClient';
import { QK_GET_WORD_LIST } from '@/services/words/constants';

export const ImportWordsForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  const onSelect = useCallback((files: FileList) => {
    if (files.length > 0) {
      setIsDisabled(true);
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', async () => {
        if (typeof reader.result === 'string') {
          const data = JSON.parse(reader.result);
          setResult(await importDataFromFile(data));
          queryClient.invalidateQueries({ queryKey: [QK_GET_WORD_LIST] });
        }
      });
      reader.readAsText(file);
    }
  }, []);

  return (
    <Stack spacing={2} alignItems="start" marginTop={1}>
      {result === true && <Alert severity="success">Файл успешно импортирован!</Alert>}
      {result === false && <Alert severity="error">При импорте файла произошла ошибка!</Alert>}
      <FileUploadButton label="Выберите файл" onSelect={onSelect} disabled={isDisabled} />
    </Stack>
  );
};
