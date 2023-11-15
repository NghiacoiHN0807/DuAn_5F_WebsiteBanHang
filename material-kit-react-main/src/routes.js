import {Navigate, useRoutes} from 'react-router-dom';
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
import Sales from './pages/DirectSale-ADM';
import CartBillADM from './pages/Cart-Bill-ADM';
import OrderManagement from './pages/OrderManagement';
import OrderManagementTimeline from './pages/OrderManagement-Timeline';
import Home from './pages/client/Home';
import DashboardLayoutClient from './layouts/dashboard/DashboardLayout-Client';

import ClientsPage from "./pages/taiKhoanKhachHang/ClientsPage";
import AddClients from "./pages/taiKhoanKhachHang/AddClients";
import UpdateClients from "./pages/taiKhoanKhachHang/UpdateClients";
import AllAddress from "./pages/diaChi/AllAddress";
import AddressByClient from "./pages/diaChi/AddressByClient";
import AddAddress from "./pages/diaChi/AddAddress";
import UpdateAddress from "./pages/diaChi/UpdateAddress";


// ----------------------------------------------------------------------

export default function Router() {
    const getLocalStore = localStorage.getItem('userFormToken');
    const authorities = getLocalStore && JSON.parse(getLocalStore).authorities[0].authority;

    const layoutElement =
        authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? <DashboardLayout/> : <DashboardLayoutClient/>;

    const routes = useRoutes([
        {
            path: authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? '/dashboard' : '/client',
            element: layoutElement,
            children:
                authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF'
                    ? [
                        {element: <Navigate to="/dashboard/app"/>, index: true},
                        {path: 'app', element: <DashboardAppPage/>},
                        {path: 'bills', element: <OrderManagement/>},
                        {path: 'bills/time-line/:id', element: <OrderManagementTimeline/>},
                        {path: 'sales', element: <Sales/>},
                        {path: 'sales/card-bill/:id', element: <CartBillADM/>},
                        {path: 'clients', element: <ClientsPage/>},
                        {path: 'clients/add', element: <AddClients/>},
                        {path: 'clients/detail/:id', element: <UpdateClients/>},
                        {path: 'address', element: <AllAddress/>},
                        {path: 'address/:id', element: <AddressByClient/>},
                        {path: 'address/add/:id', element: <AddAddress/>},
                        {path: 'address/detail/:id', element: <UpdateAddress/>},
                        {path: 'staff', element: <UserPage/>},
                        {path: 'products', element: <ProductsPage/>},
                        {path: 'discounts', element: <BlogPage/>},
                    ]
                    : [
                        {element: <Navigate to="/client/home"/>, index: true},
                        {path: 'home', element: <Home/>},
                    ],
        },
        {
            path: 'login',
            element: <LoginPage/>,
        },
        {
            element: <SimpleLayout/>,
            children: [
                {
                    element:
                        authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? (
                            <Navigate to="/dashboard/app"/>
                        ) : (
                            <Navigate to="/client/home"/>
                        ),
                    index: true,
                },
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/404"/>},
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
