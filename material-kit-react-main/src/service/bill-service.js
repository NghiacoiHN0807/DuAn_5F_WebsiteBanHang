import custom from './custom-axios';

const selectAllBill = (page) => custom.get(`/hoa-don/view-all-offline-invoice?p=${page}`);
const postAddBill = (maHd, ngayTao, kieuHoaDon, trangThai) =>
  custom.post('/hoa-don/add', { maHd, ngayTao, kieuHoaDon, trangThai });
const detailBill = (idHd) => custom.get(`/hoa-don/detail/${idHd}`);
const findByMaHD = (maHd) => custom.get(`/hoa-don/findByMaHD/${maHd}`);
const deleteHD = (idHd) => custom.put(`/hoa-don/delete/${idHd}`);
const selectAllImgProduct = (page) => custom.get(`/images/view-all?p=${page}`);
const selectClassify = (nameSP) => custom.get(`chi-tiet-san-pham/select-Classify/${nameSP}`);
const fetchAllCTSPBySize = (page) => custom.get(`/chi-tiet-san-pham/view-all-ctsp?p=${page}`);
const findByProductNameAndSize = (name, size) => custom.get(`/chi-tiet-san-pham/get-one-ctsp/${name}/${size}`);
const findById = (idSp) => custom.get(`/chi-tiet-san-pham/select-ctsp-byId/${idSp}`);
const finByProductOnCart = (page, idHd) => custom.get(`/hoa-don-chi-tiet/view-all-prduct/${idHd}?p=${page}`);
const getAllDataTaiKhoan = (page) => custom.get(`/tai-khoan-khach-hang/view-all-kh?p=${page}`);
const selectAllInvoiceWaiting = () => custom.get(`/hoa-don/view-all-invoice-waiting`);
const paymentOnline = (amount, orderInfo) =>
  custom.post(`/hoa-don/submitOrder?amount=${amount}&orderInfo=${orderInfo}`);
const paymentOnlineSuccess = () => custom.get(`/hoa-don/vnpay-payment`);
const totalRevenue = () => custom.get(`/hoa-don/total-revenue`);
const totalInvoieces = () => custom.get(`/hoa-don/total-invoices`);
const totalTheoNgay = () => custom.get(`/hoa-don/total-revenue-by-day`);
const tyLeTraHang = () => custom.get(`/hoa-don/ty-le-tra-hang`);
const tongSpDaBan = () => custom.get(`/hoa-don/tong-sp-da-ban`);

export {
  selectAllBill,
  postAddBill,
  detailBill,
  findByMaHD,
  selectAllImgProduct,
  deleteHD,
  selectClassify,
  fetchAllCTSPBySize,
  findByProductNameAndSize,
  findById,
  finByProductOnCart,
  getAllDataTaiKhoan,
  selectAllInvoiceWaiting,
  paymentOnline,
  paymentOnlineSuccess,
  totalRevenue,
  totalInvoieces,
  totalTheoNgay,
  tyLeTraHang,
  tongSpDaBan,
};
