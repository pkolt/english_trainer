import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography, Box, IconButton, Button, Input } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Word, WordType } from '@/services/words/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteWord, getWordList } from '@/services/words/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WORD_TYPE_TO_NAME } from '@/constants/word';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDialogs } from '@toolpad/core/useDialogs';
import WordFormDialog from './WordFormDialog';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { ImportWordsDialog } from './ImportWordsDialog';
import SearchIcon from '@mui/icons-material/Search';
import { filterWordsBySearchText, filterWordsByTypes } from './utils';
import { FilterByTypes } from './FilterByTypes';
import { SpeakButton } from '@/components/SpeakButton';

const Dictionary = () => {
  const [searchText, setSearchText] = useState('');
  const [wordTypes, setWordTypes] = useState<WordType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const filteredWordList = useMemo(() => {
    let result = filterWordsBySearchText(wordList, searchText);
    result = filterWordsByTypes(result, wordTypes);
    return result;
  }, [searchText, wordList, wordTypes]);

  const isUsedFilter: boolean = !!searchText.trim() || wordTypes.length > 0;

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
      field: 'favorite',
      headerName: '',
      renderCell({ value }) {
        return (
          <Box height="100%" display="flex" justifyContent="center" alignItems="center">
            {value ? <StarRoundedIcon color="warning" /> : <StarBorderRoundedIcon color="disabled" />}
          </Box>
        );
      },
    },
    {
      field: 'word',
      headerName: 'Слово',
      width: 300,
      renderCell({ value, row: { word, transcription } }) {
        return (
          <>
            <SpeakButton text={value} />
            <strong>{word}</strong>
            {!!transcription && ` [${transcription}]`}
          </>
        );
      },
    },
    {
      field: 'translate',
      headerName: 'Перевод',
      width: 250,
    },
    {
      field: 'types',
      headerName: 'Тип',
      width: 150,
      valueGetter(value: WordType[]) {
        return value.map((it) => WORD_TYPE_TO_NAME[it]).join(', ');
      },
    },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      getActions({ row: { id, word } }) {
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
              const res = await dialogs.confirm(`Вы действительно хотите удалить слово "${word}" из словаря?`, {
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

  const handleClickImport = useCallback(async () => {
    await dialogs.open(ImportWordsDialog);
    await fetchWordList();
  }, [dialogs, fetchWordList]);

  const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const handleClickReset = useCallback(() => {
    setSearchText('');
    setWordTypes([]);
  }, []);

  return (
    <DashboardPagesLayout>
      <Typography variant="h4" marginBottom={2}>
        Словарь{' '}
        <IconButton color="success" title="Добавить слово" onClick={handleClickAddWord}>
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Input
            type="search"
            startAdornment={<SearchIcon />}
            color="primary"
            placeholder="Поиск"
            value={searchText}
            onChange={handleChangeSearch}
          />
          <FilterByTypes value={wordTypes} onChange={setWordTypes} />
          {isUsedFilter && (
            <Button variant="outlined" onClick={handleClickReset}>
              Сброс
            </Button>
          )}
        </Box>
        <Button variant="outlined" startIcon={<GetAppRoundedIcon />} onClick={handleClickImport}>
          Импорт
        </Button>
      </Box>
      <Box width="100%" minHeight="400px">
        <DataGrid
          rows={filteredWordList}
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
