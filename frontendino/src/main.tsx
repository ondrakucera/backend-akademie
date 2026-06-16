import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import { DinosaurDetailPage } from './pages/DinosaurDetailPage';
import { DinosaurFormPage } from './pages/DinosaurFormPage';
import { DinosaurListPage } from './pages/DinosaurListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DinosaurListPage /> },
      { path: 'dinosaurs/new', element: <DinosaurFormPage mode="create" /> },
      { path: 'dinosaurs/:id', element: <DinosaurDetailPage /> },
      { path: 'dinosaurs/:id/edit', element: <DinosaurFormPage mode="edit" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
