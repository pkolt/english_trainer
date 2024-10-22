import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Grid2 as Grid, Typography } from '@mui/material';
import { ExerciseCard } from './ExerciseCard';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import ForkLeftRoundedIcon from '@mui/icons-material/ForkLeftRounded';
import ForkRightRoundedIcon from '@mui/icons-material/ForkRightRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import { PageUrl } from '@/constants/urls';

const Exercises = () => {
  return (
    <DashboardPagesLayout>
      <Typography variant="h4" marginBottom={2}>
        Тренировки
      </Typography>
      <Grid container spacing={2} maxWidth="50%">
        <Grid size={6}>
          <ExerciseCard
            title="Слово-перевод"
            icon={<ForkLeftRoundedIcon fontSize="inherit" />}
            pageUrl={PageUrl.WordTranslate}
          />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Перевод-слово" icon={<ForkRightRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Аудирование" icon={<CampaignRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Написание" icon={<CreateRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Кроссворд" icon={<WidgetsRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Часы" icon={<AccessTimeRoundedIcon fontSize="inherit" />} disable />
        </Grid>
        <Grid size={6}>
          <ExerciseCard title="Неправильные глаголы" icon={<DirectionsRunRoundedIcon fontSize="inherit" />} disable />
        </Grid>
      </Grid>
    </DashboardPagesLayout>
  );
};

export default Exercises;
