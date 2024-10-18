import DashboardPagesLayout from '@/layouts/DashboardPagesLayout';
import { Typography } from '@mui/material';
import { SettingsForm } from './SettingsForm';
const Settings = () => {
  return (
    <DashboardPagesLayout>
      <Typography variant="h4" marginBottom={2}>
        Настройки
      </Typography>
      <SettingsForm />
    </DashboardPagesLayout>
  );
};

export default Settings;
