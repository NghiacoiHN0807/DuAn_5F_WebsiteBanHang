import custom from "./custom-axios";
const selectAllBill = (page) => {
  return custom.get(`/hoa-don/view-all-offline-invoice?p=${page}`);
};
const postAddBill = (maHd, ngayTao, kieuHoaDon, trangThai) => {
  return custom.post("/hoa-don/add", { maHd, ngayTao, kieuHoaDon, trangThai });
};
const detailBill = (id_hd) => {
  return custom.get(`/hoa-don/detail/${id_hd}`);
};
const findByMaHD = (ma_hd) => {
  return custom.get(`/hoa-don/findByMaHD/${ma_hd}`);
};
const deleteHD = (id_hd) => {
  return custom.put(`/hoa-don/delete/${id_hd}`);
};
const selectAllImgProduct = (page) => {
  return custom.get(`/images/view-all?p=${page}`);
};
const selectClassify = (nameSP) => {
  return custom.get(`chi-tiet-san-pham/select-Classify/${nameSP}`);
};
const fetchAllCTSPBySize = (page) => {
  return custom.get(`/chi-tiet-san-pham/view-all-ctsp?p=${page}`); // Call API
};
const findByProductNameAndSize = (name, size) => {
  return custom.get(`/chi-tiet-san-pham/get-one-ctsp/${name}/${size}`); // Call API
};
const findById = (idSp) => {
  return custom.get(`/chi-tiet-san-pham/select-ctsp-byId/${idSp}`); // Call API
};
const finByProductOnCart = (page, idHd) => {
  return custom.get(`/hoa-don-chi-tiet/view-all-prduct/${idHd}?p=${page}`);
};
const getAllDataTaiKhoan = (page) => {
  return custom.get(`/tai-khoan-khach-hang/view-all-kh?p=${page}`); // Call API
};
const selectAllInvoiceWaiting = () => {
  return custom.get(`/hoa-don/view-all-invoice-waiting`);
};
const paymentOnline = (amount, orderInfo) => {
  return custom.post(
    `/hoa-don/submitOrder?amount=${amount}&orderInfo=${orderInfo}`
  );
};
const paymentOnlineSuccess = () => {
  return custom.get(`/hoa-don/vnpay-payment`);
};
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
