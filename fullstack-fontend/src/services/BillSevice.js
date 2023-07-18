import custom from "./custom-axios";
const selectAllBill = (page) => {
  return custom.get(`/hoa-don/view-all?p=${page}`);
};
const selectAllImgProduct = (page) => {
  return custom.get(`/images/view-all?p=${page}`);
};
const postAddBill = (maHd, ngayTao, trangThai) => {
  return custom.post("/hoa-don/add", { maHd, ngayTao, trangThai });
};
const detailBill = (id_hd) => {
  return custom.get(`/hoa-don/detail/${id_hd}`);
};
const findByMaHD = (ma_hd) => {
  return custom.get(`/hoa-don/findByMaHD/${ma_hd}`);
};
export {
  selectAllBill,
  postAddBill,
  detailBill,
  findByMaHD,
  selectAllImgProduct,
};