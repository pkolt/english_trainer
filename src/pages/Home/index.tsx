import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <DashboardPagesLayout>
      <Typography variant="h2" textAlign="center">
        Добро пожаловать в English Trainer!
      </Typography>
    </DashboardPagesLayout>
  );
};

export default Home;
