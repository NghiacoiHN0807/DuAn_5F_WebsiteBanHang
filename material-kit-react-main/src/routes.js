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
import Sales from './pages/DirectSale-ADM';
import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';
import Home from './pages/client/Home';
import DashboardLayoutClient from './layouts/dashboard/DashboardLayout-Client';
import DiscountPage from './pages/discounts/DiscountPage';
import ModelAddNewGiamGia from './pages/discounts/ModalsAddNewGiamGia';
import ModelUpdateGiamGia from './pages/discounts/ModalsUpdateGiamGia';
import DetailProduct from './pages/client/Detail-product';
import Cart from './pages/client/Cart';
import PaymentPage from './pages/client/Payment-Page';

// ----------------------------------------------------------------------

export default function Router() {
  const getLocalStore = localStorage.getItem('userFormToken');
  const authorities = getLocalStore && JSON.parse(getLocalStore).authorities[0].authority;

  const layoutElement =
    authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? <DashboardLayout /> : <DashboardLayoutClient />;

  const routes = useRoutes([
    {
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
              { path: 'detail/:id', element: <DetailProduct /> },
              { path: 'cart', element: <Cart /> },
              { path: 'payment/:id', element: <PaymentPage /> },
            ],
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
