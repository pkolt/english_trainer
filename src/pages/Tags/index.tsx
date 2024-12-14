import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography, Box, IconButton } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useDeleteTag, useGetTagList } from '@/services/tags/hooks';
import { Tag } from '@/services/tags/types';
import { TagFormDialog } from './TagFormDialog';

const Tags = () => {
  const { data: tagList, isLoading } = useGetTagList();
  const { mutate: deleteTag } = useDeleteTag();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const dialogs = useDialogs();

  const columns: GridColDef<Tag>[] = [
    {
      field: 'name',
      headerName: 'Название',
      width: 250,
    },
    {
      field: 'count',
      headerName: 'Кол-во слов',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      getActions({ row: { id, name } }) {
        return [
          <GridActionsCellItem
            key="action-edit"
            icon={<EditIcon color="primary" />}
            label="Изменить"
            onClick={() => {
              dialogs.open(TagFormDialog, id);
            }}
          />,
          <GridActionsCellItem
            key="action-delete"
            icon={<DeleteIcon color="error" />}
            label="Удалить"
            onClick={async () => {
              const res = await dialogs.confirm(`Вы действительно хотите удалить тег "${name}"?`, {
                title: 'Удалить тег',
                okText: 'Да',
                cancelText: 'Нет',
              });
              if (res) {
                deleteTag(id);
              }
            }}
          />,
        ];
      },
    },
  ];

  const handleClickAdd = () => {
    dialogs.open(TagFormDialog);
  };

  return (
    <DashboardPagesLayout>
      <Typography variant="h4" marginBottom={2}>
        Теги{' '}
        <IconButton color="success" title="Добавить тег" onClick={handleClickAdd}>
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </Typography>
      <Box width="100%" minHeight="400px">
        <DataGrid
          rows={tagList}
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

export default Tags;
