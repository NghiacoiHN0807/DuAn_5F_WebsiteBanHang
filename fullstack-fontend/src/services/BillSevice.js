import custom from "./custom-axios";
const selectAllBill = (page) => {
  return custom.get(`/hoa-don/view-all-offline-invoice?p=${page}`);
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
};
