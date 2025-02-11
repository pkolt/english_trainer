import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { JSX } from 'react';

export const renderElement = (elem: JSX.Element, options?: RenderOptions) => {
  const user = userEvent.setup();
  const result = render(elem, { ...options });
  return { userEvent: user, ...result };
};
