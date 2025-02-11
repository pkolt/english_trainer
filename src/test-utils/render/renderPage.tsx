import { RenderOptions, act } from '@testing-library/react';
import { renderElement } from './renderElement';
import { Providers } from './Providers';
import { createMemoryRouter } from 'react-router-dom';
import { PageUrl } from '@/constants/urls';

import type { JSX } from 'react';

interface ProviderProps {
  route: {
    path: PageUrl;
  };
}

export const renderPage = (elem: JSX.Element, props: ProviderProps, options?: RenderOptions) => {
  const memoryRouter = createMemoryRouter(
    [
      {
        path: props.route.path,
        element: elem,
      },
      {
        path: '*',
        element: null,
      },
    ],
    {
      initialEntries: [props.route.path],
      initialIndex: 1,
    },
  );

  const router = {
    get location() {
      return memoryRouter.state.location;
    },
    get navigate() {
      // Wrapping act() for re rendering after navigation.
      return (...args: Parameters<typeof memoryRouter.navigate>) => act(() => memoryRouter.navigate(...args));
    },
  };

  const result = renderElement(elem, {
    ...options,
    wrapper: () => <Providers router={memoryRouter} />,
  });

  return { ...result, router };
};
