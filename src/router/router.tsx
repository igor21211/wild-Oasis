import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '../ui/Spinner';
import AppLayout from '../ui/AppLayout';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Bookings = lazy(() => import('../pages/Bookings'));
const Cabins = lazy(() => import('../pages/Cabins'));
const Users = lazy(() => import('../pages/Users'));
const Settings = lazy(() => import('../pages/Settings'));
const Login = lazy(() => import('../pages/Login'));
const Account = lazy(() => import('../pages/Account'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Booking = lazy(() => import('../pages/Booking'));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/bookings',
        element: (
          <Suspense fallback={<Spinner />}>
            <Bookings />
          </Suspense>
        ),
      },
      {
        path: '/bookings/:bookingId',
        element: (
          <Suspense fallback={<Spinner />}>
            <Booking />
          </Suspense>
        ),
      },
      {
        path: '/cabins',
        element: (
          <Suspense fallback={<Spinner />}>
            <Cabins />
          </Suspense>
        ),
      },
      {
        path: '/users',
        element: (
          <Suspense fallback={<Spinner />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: '/settings',
        element: (
          <Suspense fallback={<Spinner />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: '/account',
        element: (
          <Suspense fallback={<Spinner />}>
            <Account />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Spinner />}>
        <PageNotFound />
      </Suspense>
    ),
  },
]);

export default router;
