import { Navigate, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Sales from './pages/DirectSale-ADM';
import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';

import SanPham from './pages/SanPham/SanPhamMain';
import AddSanPham from './pages/SanPham/ModelAdd';
import UpdateSanPham from './pages/SanPham/ModelUpdate';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <>
          <DashboardLayout />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            containerId="toast-container"
          />
        </>
      ),

      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'bills', element: <OrderManagement /> },
        { path: 'bills/time-line/:id', element: <OrderManagementTimeline /> },
        { path: 'sales', element: <Sales /> },
        { path: 'sales/card-bill/:id', element: <CartBillADM /> },
        { path: 'clients', element: <UserPage /> },
        { path: 'staff', element: <UserPage /> },
        { path: 'products', element: <SanPham /> },
        { path: 'products/add', element: <AddSanPham /> },
        { path: 'products/update/:id', element: <UpdateSanPham /> },
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
