import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ClientsPage from "./pages/taiKhoanKhachHang/ClientsPage";
import AddTkKH from "./pages/taiKhoanKhachHang/AddTkKH";
import UpdateTkKH from "./pages/taiKhoanKhachHang/UpdateTkKH";


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'bills', element: <DashboardAppPage /> },
        { path: 'sales', element: <DashboardAppPage /> },
        { path: 'clients', element: <ClientsPage /> },
        { path: 'clients/them-tai-khoan', element: <AddTkKH /> },
        { path: 'clients/detail/:id', element: <UpdateTkKH /> },
        { path: 'staff', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'discounts', element: <BlogPage /> },
      ],
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
