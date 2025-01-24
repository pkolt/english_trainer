import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography, Box, IconButton, Button, Input, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Word, WordType } from '@/services/words/types';
import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDialogs } from '@toolpad/core/useDialogs';
import WordFormDialog from '@/components/WordFormDialog';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { ImportWordsDialog } from './ImportWordsDialog';
import SearchIcon from '@mui/icons-material/Search';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import { useDeleteWord, useGetWordList } from '@/services/words/hooks';
import { FilterByTags } from '@/components/FilterByTags';
import { FilterByWordTypes } from '@/components/FilterByWordTypes';
import {
  filterWordsBySearchText,
  filterWordsByTagIds,
  filterWordsByTypes,
  orderWordsByAbc,
  orderWordsByFavorite,
  renderWordTypes,
  dateGetter,
  dateFormatter,
} from '@/services/words/utils';
import { ExportWordsDialog } from './ExportWordsDialog';

const Dictionary = () => {
  const { data: wordList, isLoading } = useGetWordList();
  const { mutate: deleteWord } = useDeleteWord();
  const [searchText, setSearchText] = useState('');
  const [wordTypes, setWordTypes] = useState<WordType[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const filteredWordList = (() => {
    let result = filterWordsBySearchText(wordList ?? [], searchText);
    result = filterWordsByTypes(result, wordTypes);
    result = filterWordsByTagIds(result, tagIds);
    result = orderWordsByAbc(result);
    result = orderWordsByFavorite(result);
    return result;
  })();

  const isUsedFilter: boolean = !!searchText.trim() || wordTypes.length > 0 || tagIds.length > 0;

  const dialogs = useDialogs();

  const columns: GridColDef<Word>[] = [
    {
      field: 'favorite',
      headerName: '',
      sortable: false,
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
            <SimpleSpeakButton text={value} />
            <strong>{word}</strong>
            {!!transcription && ` [${transcription}]`}
          </>
        );
      },
    },
    {
      field: 'translate',
      headerName: 'Перевод',
      sortable: false,
      width: 250,
    },
    {
      field: 'types',
      headerName: 'Тип',
      sortable: false,
      width: 150,
      valueGetter: renderWordTypes,
    },
    {
      field: 'createdAt',
      headerName: 'Добавлено',
      width: 150,
      valueGetter: dateGetter,
      valueFormatter: dateFormatter,
      type: 'date',
    },
    {
      field: 'actions',
      headerName: 'Действия',
      sortable: false,
      type: 'actions',
      getActions({ row: { id, word } }) {
        return [
          <GridActionsCellItem
            key="action-edit"
            icon={<EditRoundedIcon color="primary" />}
            label="Изменить"
            onClick={() => {
              dialogs.open(WordFormDialog, id);
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
                deleteWord(id);
              }
            }}
          />,
        ];
      },
    },
  ];

  const handleClickAddWord = () => {
    dialogs.open(WordFormDialog);
  };

  const handleClickImport = () => {
    dialogs.open(ImportWordsDialog);
  };

  const handleClickExport = () => {
    dialogs.open(ExportWordsDialog);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClickReset = () => {
    setSearchText('');
    setWordTypes([]);
    setTagIds([]);
  };

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
          <FilterByTags value={tagIds} onChangeValue={setTagIds} />
          <FilterByWordTypes value={wordTypes} onChangeValue={setWordTypes} />
          {isUsedFilter && (
            <Button variant="outlined" onClick={handleClickReset}>
              Сброс
            </Button>
          )}
        </Box>
        <Stack direction="row" gap={1}>
          <Button variant="outlined" startIcon={<FileUploadRoundedIcon />} onClick={handleClickExport}>
            Экспорт
          </Button>
          <Button variant="outlined" startIcon={<GetAppRoundedIcon />} onClick={handleClickImport}>
            Импорт
          </Button>
        </Stack>
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
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'createdAt',
                  sort: 'desc',
                },
              ],
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          columns={columns}
          disableColumnResize
          disableColumnFilter
          // disableColumnSorting
          disableColumnMenu
        />
      </Box>
    </DashboardPagesLayout>
  );
};

export default Dictionary;
