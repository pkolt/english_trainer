import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { CssBaseline } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { UpdatePWA } from './components/UpdatePWA';
import type { Router } from '@toolpad/core';
import { useMemo } from 'react';
import { NAVIGATION } from './constants/navigation';
import { BRANDING } from './constants/branding';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU as dataGridRuRu } from '@mui/x-data-grid/locales';
import { ruRU as coreRuRu } from '@mui/material/locale';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';

const theme = createTheme({}, dataGridRuRu, coreRuRu);

const App = () => {
  const muiRouter = useMemo<Router>(() => {
    return {
      pathname: router.state.location.pathname,
      searchParams: new URLSearchParams(router.state.location.search),
      navigate: (path) => {
        return router.navigate(String(path));
      },
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppProvider branding={BRANDING} navigation={NAVIGATION} router={muiRouter}>
        <ThemeProvider theme={theme}>
          <DialogsProvider>
            <RouterProvider router={router} />
            <UpdatePWA />
          </DialogsProvider>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
