import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SuspenseFallback } from './components/SuspenseFallback/index.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
