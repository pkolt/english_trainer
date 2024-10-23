/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PageUrl } from './constants/urls';

const Home = lazy(() => import('./pages/Home'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const Exercises = lazy(() => import('./pages/Exercises'));
const Settings = lazy(() => import('./pages/Settings'));
const Tags = lazy(() => import('./pages/Tags'));
const WordToTranslation = lazy(() => import('./pages/WordToTranslation'));

export const router = createBrowserRouter(
  [
    {
      path: PageUrl.Home,
      element: <Home />,
    },
    {
      path: PageUrl.Dictionary,
      element: <Dictionary />,
    },
    {
      path: PageUrl.Exercises,
      element: <Exercises />,
    },
    {
      path: PageUrl.Settings,
      element: <Settings />,
    },
    {
      path: PageUrl.Tags,
      element: <Tags />,
    },
    {
      path: PageUrl.WordToTranslation,
      element: <WordToTranslation />,
    },
    {
      path: '*',
      element: <Navigate to={PageUrl.Home} />,
    },
  ],
  {
    basename: '/english_trainer/',
  },
);
