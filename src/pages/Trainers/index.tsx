import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { TrainerCard } from './TrainerCard';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import ForkLeftRoundedIcon from '@mui/icons-material/ForkLeftRounded';
import ForkRightRoundedIcon from '@mui/icons-material/ForkRightRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import { PageUrl } from '@/constants/urls';
import { useMemo, useState } from 'react';
import { WordType } from '@/services/words/types';
import { FilterByTags } from '@/components/FilterByTags';
import { FilterByWordTypes } from '@/components/FilterByWordTypes';
import { TrainerRouteState } from './types';
import { useGetWordProgressList } from '@/services/wordProgress/hooks';
import { getCountWordToTranslateForToday } from '@/services/wordProgress/utils';

const Trainers = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [wordTypes, setWordTypes] = useState<WordType[]>([]);
  const isFiltered = tags.length > 0 || wordTypes.length > 0;
  const pageState = useMemo<TrainerRouteState>(() => ({ tags, wordTypes }), [tags, wordTypes]);
  const { data: wordProgressList } = useGetWordProgressList();
  const countWordToTranslate = useMemo(
    () => getCountWordToTranslateForToday(wordProgressList ?? []),
    [wordProgressList],
  );

  const resetFilter = () => {
    setTags([]);
    setWordTypes([]);
  };

  return (
    <DashboardPagesLayout>
      <Stack direction="row" spacing={2} marginBottom={4}>
        <Typography variant="h4" marginBottom={2}>
          Тренировки
        </Typography>
        <FilterByWordTypes value={wordTypes} onChangeValue={setWordTypes} />
        <FilterByTags value={tags} onChangeValue={setTags} />
        {isFiltered && (
          <Button variant="outlined" onClick={resetFilter}>
            Сброс
          </Button>
        )}
      </Stack>
      <Grid container spacing={2} maxWidth="50%">
        <Grid size={6}>
          <TrainerCard
            title="Слово-перевод"
            icon={<ForkLeftRoundedIcon fontSize="inherit" />}
            pageUrl={PageUrl.WordToTranslation}
            pageState={pageState}
            badgeCount={countWordToTranslate}
          />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Перевод-слово" icon={<ForkRightRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Аудирование" icon={<CampaignRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Написание" icon={<CreateRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Кроссворд" icon={<WidgetsRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Часы" icon={<AccessTimeRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <TrainerCard title="Неправильные глаголы" icon={<DirectionsRunRoundedIcon fontSize="inherit" />} disable />
        </Grid>
      </Grid>
    </DashboardPagesLayout>
  );
};

export default Trainers;
