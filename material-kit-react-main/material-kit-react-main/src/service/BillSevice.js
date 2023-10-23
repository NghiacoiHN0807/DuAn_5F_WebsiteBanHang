import custom from './custom-axios';

const selectAllBill = () => custom.get(`/hoa-don/view-all-offline-invoice`);
const postAddBill = (kieuHoaDon, trangThai) => custom.post('/hoa-don/add', { kieuHoaDon, trangThai });
// const detailBill = (id_hd) => custom.get(`/hoa-don/detail/${id_hd}`);
const detailBill = (idHd) => custom.get(`/hoa-don/detail/${idHd}`);

const findByMaHD = (mahd) => custom.get(`/hoa-don/findByMaHD/${mahd}`);
const deleteHD = (idhd) => custom.put(`/hoa-don/delete/${idhd}`);
const selectAllImgProduct = (page) => custom.get(`/images/view-all?p=${page}`);
const selectClassify = (nameSP) => custom.get(`chi-tiet-san-pham/select-Classify/${nameSP}`);
const fetchAllCTSPBySize = (page) => custom.get(`/chi-tiet-san-pham/view-all-ctsp?p=${page}`);
const findByProductNameAndSize = (name, size, ms) =>
  custom.get(`/chi-tiet-san-pham/get-one-ctsp/${name}/${size}/${ms}`);
const findById = (idSp) => custom.get(`/chi-tiet-san-pham/select-ctsp-byId/${idSp}`);
const finByProductOnCart = (page, idHd) => custom.get(`/hoa-don-chi-tiet/view-all-prduct/${idHd}?p=${page}`);
const getAllDataTaiKhoan = () => custom.get(`/tai-khoan-khach-hang/view-all-kh`);
const selectAllInvoiceWaiting = () => custom.get(`/hoa-don/view-all-invoice-waiting`);
const paymentOnline = (amount, orderInfo) =>
  custom.post(`/hoa-don/submitOrder?amount=${amount}&orderInfo=${orderInfo}`);
const paymentOnlineSuccess = () => custom.get(`/hoa-don/vnpay-payment`);

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
};
