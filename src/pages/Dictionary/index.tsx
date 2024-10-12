import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography, Box, IconButton } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Word, WordType } from '@/services/words/types';
import { useCallback, useEffect, useState } from 'react';
import { deleteWord, getWordList } from '@/services/words';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WORD_TYPE_TO_NAME } from '@/constants/word';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDialogs } from '@toolpad/core/useDialogs';
import WordFormDialog from '@/components/WordFormDialog';

const Dictionary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const fetchWordList = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getWordList();
      setWordList(res);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dialogs = useDialogs();

  const columns: GridColDef<Word>[] = [
    {
      field: 'text',
      headerName: 'Слово',
      width: 150,
    },
    {
      field: 'transcription',
      headerName: 'Транскрипция',
      width: 150,
    },
    {
      field: 'translate',
      headerName: 'Перевод',
      width: 150,
    },
    {
      field: 'type',
      headerName: 'Часть речи',
      width: 250,
      valueGetter: (value: string[]) => {
        return value.map((key: string) => WORD_TYPE_TO_NAME[key as WordType]).join(', ');
      },
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
      type: 'actions',
      getActions: ({ row: { id, text } }) => {
        return [
          <GridActionsCellItem
            key="action-edit"
            icon={<EditIcon color="primary" />}
            label="Изменить"
            onClick={async () => {
              await dialogs.open(WordFormDialog, id);
              await fetchWordList();
            }}
          />,
          <GridActionsCellItem
            key="action-delete"
            icon={<DeleteIcon color="error" />}
            label="Удалить"
            onClick={async () => {
              const res = await dialogs.confirm(`Вы действительно хотите удалить слово "${text}" из словаря?`, {
                title: 'Удалить слово',
                okText: 'Да',
                cancelText: 'Нет',
              });
              if (res) {
                await deleteWord(id);
                await fetchWordList();
              }
            }}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    fetchWordList();
  }, [fetchWordList]);

  const handleClickAddWord = useCallback(async () => {
    await dialogs.open(WordFormDialog);
    await fetchWordList();
  }, [dialogs, fetchWordList]);

  return (
    <DashboardPagesLayout>
      <Typography variant="h2" marginBottom={2}>
        Словарь{' '}
        <IconButton color="success" title="Добавить слово" onClick={handleClickAddWord}>
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </Typography>
      <Box width="100%" minHeight="400px">
        <DataGrid
          rows={wordList}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          columns={columns}
          disableColumnResize
          disableColumnFilter
          disableColumnSorting
          disableColumnMenu
        />
      </Box>
    </DashboardPagesLayout>
  );
};

export default Dictionary;
