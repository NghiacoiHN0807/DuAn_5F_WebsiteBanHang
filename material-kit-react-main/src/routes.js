import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserStaff from './pages/Staff/Modal-User-Staff';
import AddTKNV from './pages/Staff/Modal-Add-Staff';
import UpdateTkNV from './pages/Staff/Modal-Update-Staff';
import Sales from './pages/DirectSale-ADM';

import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';
import DiscountPage from './pages/discounts/DiscountPage';
import ModelAddNewGiamGia from './pages/discounts/ModalsAddNewGiamGia';
import ModelUpdateGiamGia from './pages/discounts/ModalsUpdateGiamGia';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'bills', element: <OrderManagement /> },
        { path: 'bills/time-line/:id', element: <OrderManagementTimeline /> },
        { path: 'sales', element: <Sales /> },
        { path: 'sales/card-bill/:id', element: <CartBillADM /> },
        { path: 'clients', element: <UserPage /> },
        { path: 'staff', element: <UserStaff /> },
        { path: "addNewTKNV", element: <AddTKNV /> },
        { path: "detail/:id", element: <UpdateTkNV /> },
        { path: 'staff', element: <UserPage /> },
        { path: 'discount/add', element: <ModelAddNewGiamGia /> },
        { path: 'discount/update/:id', element: <ModelUpdateGiamGia /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'discounts', element: <DiscountPage /> },
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
