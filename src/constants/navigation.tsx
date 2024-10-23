import { PageUrl } from './urls';
import type { Navigation } from '@toolpad/core';
import BookIcon from '@mui/icons-material/Book';
import SurfingIcon from '@mui/icons-material/Surfing';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';

const getSegment = (url: PageUrl): string => {
  return url.slice(1);
};

export const NAVIGATION: Navigation = [
  {
    segment: getSegment(PageUrl.Dictionary),
    title: 'Словарь',
    icon: <BookIcon />,
  },
  {
    segment: getSegment(PageUrl.Tags),
    title: 'Теги',
    icon: <LocalOfferRoundedIcon />,
  },
  {
    segment: getSegment(PageUrl.Trainers),
    title: 'Тренировки',
    icon: <SurfingIcon />,
  },
  {
    segment: getSegment(PageUrl.Settings),
    title: 'Настройки',
    icon: <SettingsIcon />,
  },
];
