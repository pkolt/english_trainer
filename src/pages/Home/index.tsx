import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Stack, Typography } from '@mui/material';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';

const Home = () => {
  return (
    <DashboardPagesLayout>
      <Typography variant="h4" marginBottom={4}>
        Добро пожаловать в English Trainer!
      </Typography>

      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LooksOneRoundedIcon fontSize="large" color="primary" />
          <Typography variant="h5">Добавьте новые слова в словарь.</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LooksTwoRoundedIcon fontSize="large" color="primary" />
          <Typography variant="h5">Создайте списки слов для тренировки используя теги.</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Looks3RoundedIcon fontSize="large" color="primary" />
          <Typography variant="h5">Тренируйте слова.</Typography>
        </Stack>
      </Stack>
    </DashboardPagesLayout>
  );
};

export default Home;
