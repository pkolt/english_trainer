import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SuspenseFallback } from './components/SuspenseFallback/index.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// https://github.com/zloirock/core-js#new-set-methods
import 'core-js/proposals/set-methods-v2';
// https://github.com/zloirock/core-js#change-array-by-copy
import 'core-js/proposals/change-array-by-copy-stage-4';
import { getReadyMyDB } from './services/db.ts';

getReadyMyDB().then(() => {
  createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Suspense fallback={<SuspenseFallback />}>
      <App />
    </Suspense>,
    // </React.StrictMode>,
  );

  if (import.meta.env.PROD) {
    import('./service-worker-register.ts');
  }
});
