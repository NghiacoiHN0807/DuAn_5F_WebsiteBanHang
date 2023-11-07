import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Home from './pages/client/Home';
import Header from './layouts/client/Header';
import Footer from './layouts/client/Footer';

// ----------------------------------------------------------------------

export default function RouterClient() {
  const routes = useRoutes([
    {
      path: '/client',
      // element: <Header />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <Home /> },
      ],
      // element: <Footer />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
