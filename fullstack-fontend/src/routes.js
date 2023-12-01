import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/client/ProductsPage';
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
import UserStaff from './pages/Staff/Modal-User-Staff';
import AddTKNV from './pages/Staff/Modal-Add-Staff';
import UpdateTkNV from './pages/Staff/Modal-Update-Staff';
import Contact from './pages/client/Contact';
import PaymentPage1 from './pages/client/Payment-Page1';

// san pham
import ProductMain from './pages/SanPham/SanPhamMain';
import ProductAdd from './pages/SanPham/ModelAdd';
import ProductUpdate from './pages/SanPham/ModelUpdate';

import ClientsPage from './pages/taiKhoanKhachHang/ClientsPage';
import AddClients from './pages/taiKhoanKhachHang/AddClients';
import UpdateClients from './pages/taiKhoanKhachHang/UpdateClients';
import AllAddress from './pages/diaChi/AllAddress';
import AddressByClient from './pages/diaChi/AddressByClient';
import AddAddress from './pages/diaChi/AddAddress';
import UpdateAddress from './pages/diaChi/UpdateAddress';
import SignUp from './pages/client/SignUp';
import AddCoupons from './pages/coupons/AddCoupons';
import CouponsPage from './pages/coupons/CouponsPage';
import UpdateCoupons from './pages/coupons/UpdateCoupons';
import OrderClientTimeline from './pages/client/OrderClient-Timeline';
import SelectAllBillOfClient from './pages/client/SelectAllBill';

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
              { path: 'staff', element: <UserStaff /> },
              { path: 'addNewTKNV', element: <AddTKNV /> },
              { path: 'detail/:id', element: <UpdateTkNV /> },
              { path: 'staff', element: <UserPage /> },
              { path: 'discounts', element: <DiscountPage /> },
              { path: 'discount/add', element: <ModelAddNewGiamGia /> },
              { path: 'discount/update/:id', element: <ModelUpdateGiamGia /> },
              { path: 'clients', element: <ClientsPage /> },
              { path: 'clients/add', element: <AddClients /> },
              { path: 'clients/detail/:id', element: <UpdateClients /> },
              { path: 'address', element: <AllAddress /> },
              { path: 'address/:id', element: <AddressByClient /> },
              { path: 'address/add/:id', element: <AddAddress /> },
              { path: 'address/detail/:id', element: <UpdateAddress /> },
              { path: 'products', element: <ProductMain /> },
              { path: 'products/add', element: <ProductAdd /> },
              { path: 'products/update/:id', element: <ProductUpdate /> },
              { path: 'coupons/add', element: <AddCoupons /> },
              { path: 'coupons', element: <CouponsPage /> },
              { path: 'coupons/update/:id', element: <UpdateCoupons /> },
            ]
          : [
              { element: <Navigate to="/client/home" />, index: true },
              { path: 'home', element: <Home /> },
              { path: 'detail/:id', element: <DetailProduct /> },
              { path: 'cart', element: <Cart /> },
              { path: 'payment/:id', element: <PaymentPage1 /> },
              { path: 'contact', element: <Contact /> },
              { path: 'products', element: <ProductsPage /> },
              { path: 'client-timeline/:id', element: <OrderClientTimeline /> },
              { path: 'select-bill-client/:idKH', element: <SelectAllBillOfClient /> },
              // { path: 'select-bill-client', element: <SelectAllBillOfClient /> },
            ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signUp',
      element: <SignUp />,
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
