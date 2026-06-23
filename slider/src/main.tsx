import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkspacePage from "./pages/WorkspacePage.tsx";
import Project from "./pages/Project.tsx";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/workspace",
    element: <WorkspacePage />,
  },
  // другие маршруты
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);