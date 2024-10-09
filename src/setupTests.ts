// They will be run before each test file.

import { DateTime } from 'luxon';
import { cleanup } from '@testing-library/react';
import { Settings } from 'luxon';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { setupMatchers } from './test-utils/matchers';
import { server } from './test-utils/msw/server';
import './i18n';

setupMatchers();

// Fix timezone
Settings.defaultZone = 'Europe/Moscow';
// Fix locale
Settings.defaultLocale = 'ru-RU';

const date = DateTime.fromObject({ year: 2024, month: 5, day: 1 });
vi.setSystemTime(date.toMillis());

// https://testing-library.com/docs/react-testing-library/api/#cleanup
// https://github.com/vitest-dev/vitest/issues/1430
// Use cleanup if vitest config `globals: false`
afterEach(cleanup);

// Setup msw
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
