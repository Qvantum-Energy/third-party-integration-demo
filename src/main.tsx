import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './pages/Error';
import Root from './pages/Root';
import ExampleAuthIntegration from './pages/ExampleAuthIntegration';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        element: <ExampleAuthIntegration />,
        index: true,
      },
      {
        path: '/auth_code',
        element: <ExampleAuthIntegration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
