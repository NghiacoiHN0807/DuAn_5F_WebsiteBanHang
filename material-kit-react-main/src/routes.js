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
import UserStaff from './pages/Staff/Modal-User-Staff';
import AddTKNV from './pages/Staff/Modal-Add-Staff';
import UpdateTkNV from './pages/Staff/Modal-Update-Staff';
import Sales from './pages/DirectSale-ADM';
<<<<<<< HEAD
import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';
import Home from './pages/client/Home';
import DashboardLayoutClient from './layouts/dashboard/DashboardLayout-Client';
=======

import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';
>>>>>>> dcb3e31fa0c1456e8bc977a2275425ff64662a4f
import DiscountPage from './pages/discounts/DiscountPage';
import ModelAddNewGiamGia from './pages/discounts/ModalsAddNewGiamGia';
import ModelUpdateGiamGia from './pages/discounts/ModalsUpdateGiamGia';

// ----------------------------------------------------------------------

export default function Router() {
  const getLocalStore = localStorage.getItem('userFormToken');
  const authorities = getLocalStore && JSON.parse(getLocalStore).authorities[0].authority;

  const layoutElement =
    authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? <DashboardLayout /> : <DashboardLayoutClient />;

  const routes = useRoutes([
    {
<<<<<<< HEAD
      path: authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? '/dashboard' : '/client',
      element: layoutElement,
      children:
        authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF'
          ? [
              { element: <Navigate to="/dashboard/app" />, index: true },
              { path: 'app', element: <DashboardAppPage /> },
              { path: 'bills', element: <OrderManagement /> },
              { path: 'bills/time-line/:id', element: <OrderManagementTimeline /> },
              { path: 'sales', element: <Sales /> },
              { path: 'sales/card-bill/:id', element: <CartBillADM /> },
              { path: 'clients', element: <UserPage /> },
              { path: 'staff', element: <UserPage /> },
              { path: 'products', element: <ProductsPage /> },
              { path: 'discounts', element: <DiscountPage /> },
              { path: 'discount/add', element: <ModelAddNewGiamGia /> },
              { path: 'discount/update/:id', element: <ModelUpdateGiamGia /> },
            ]
          : [
              { element: <Navigate to="/client/home" />, index: true },
              { path: 'home', element: <Home /> },
            ],
=======
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
>>>>>>> dcb3e31fa0c1456e8bc977a2275425ff64662a4f
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        {
          element:
            authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? (
              <Navigate to="/dashboard/app" />
            ) : (
              <Navigate to="/client/home" />
            ),
          index: true,
        },
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