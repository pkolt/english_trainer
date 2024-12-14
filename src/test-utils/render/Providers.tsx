import { RouterProviderProps, RouterProvider } from 'react-router-dom';

import type { JSX } from 'react';

interface ProvidersProps {
  router: RouterProviderProps['router'];
}

export const Providers = ({ router }: ProvidersProps): JSX.Element => {
  return <RouterProvider router={router} />;
};
