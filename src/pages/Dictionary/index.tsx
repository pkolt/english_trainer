import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography, Box, IconButton, Button, Input } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Word, WordType } from '@/services/words/types';
import { useCallback, useMemo, useState } from 'react';
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
import {
  filterWordsBySearchText,
  filterWordsByTypes,
  orderWordsByFavorite,
  orderWordsByAbc,
  convertTagListToChoices,
  filterWordsByTagIds,
} from './utils';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import { useDeleteWord, useGetWordList, useGetWordTypeChoices } from '@/services/words/hooks';
import { SelectField } from '@/components/Form/SelectField';
import { useGetTagList } from '@/services/tags/hooks';

const Dictionary = () => {
  const { data: wordTypeChoices } = useGetWordTypeChoices();
  const { data: tagList } = useGetTagList();
  const { data: wordList, isLoading } = useGetWordList();
  const { mutate: deleteWord } = useDeleteWord();
  const [searchText, setSearchText] = useState('');
  const [wordTypes, setWordTypes] = useState<WordType[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const filteredWordList = useMemo(() => {
    let result = filterWordsBySearchText(wordList ?? [], searchText);
    result = filterWordsByTypes(result, wordTypes);
    result = filterWordsByTagIds(result, tagIds);
    result = orderWordsByAbc(result);
    result = orderWordsByFavorite(result);
    return result;
  }, [searchText, tagIds, wordList, wordTypes]);

  const filterTagChoices = useMemo(() => {
    return convertTagListToChoices(tagList ?? []);
  }, [tagList]);

  const isUsedFilter: boolean = !!searchText.trim() || wordTypes.length > 0 || tagIds.length > 0;

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

  const handleClickAddWord = useCallback(() => {
    dialogs.open(WordFormDialog);
  }, [dialogs]);

  const handleClickImport = useCallback(() => {
    dialogs.open(ImportWordsDialog);
  }, [dialogs]);

  const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const handleClickReset = useCallback(() => {
    setSearchText('');
    setWordTypes([]);
    setTagIds([]);
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
          <SelectField
            label="Фильтр по типу"
            choices={wordTypeChoices}
            value={wordTypes}
            onChangeValue={setWordTypes}
            multiple
            size="small"
            sx={{ minWidth: '170px', maxWidth: '300px' }}
          />
          <SelectField
            label="Фильтр по тегам"
            choices={filterTagChoices}
            value={tagIds}
            onChangeValue={setTagIds}
            multiple
            size="small"
            sx={{ minWidth: '170px', maxWidth: '300px' }}
          />
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
