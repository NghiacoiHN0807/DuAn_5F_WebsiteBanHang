// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Thống Kê',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Hóa Đơn',
    path: '/dashboard/bills',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Bán Hàng',
    path: '/dashboard/sales',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản Lý Sản Phẩm',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Giảm Giá',
    path: '/dashboard/discounts',
    icon: icon('ic_blog'),
  },
  {
    title: 'Khách Hàng',
    path: '/dashboard/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'Nhân Viên',
    path: '/dashboard/staff',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
