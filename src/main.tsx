import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from './routes/HomePage.tsx';
import api from './api/index.ts';
import Login from './routes/Login.tsx';
import Index from './routes/Index.tsx';
import Signup from './routes/Signup.tsx';
import Profile from './routes/Profile.tsx';
import Users from './routes/Users.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    loader: async ({ request }) => {
      const res = await api.auth.getUser();

      const url = new URL(request.url);
      if (url.pathname !== '/' && res.status === 401) return redirect('/')

      if (res.status === 401) return null;

      return res.data.user;
    },
    children: [
      { index: true, element: <Index /> },
      {
        path: 'home',
        index: true,
        element: <HomePage />
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'profile/:userid',
        element: <Profile />,
        loader: async ({ params }) => {
          if (params.userid) {
            const data = await api.users.getUser(params.userid);
            return data;
          }
          return null;
        }
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
