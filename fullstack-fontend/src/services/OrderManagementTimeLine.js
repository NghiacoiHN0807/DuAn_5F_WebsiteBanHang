import custom from "./custom-axios";
const updateStatusBill = (idHd, trangThai) => {
  return custom.put(`/hoa-don/update-status/${idHd}`, { trangThai });
};
const updatePayment = (idHd, ngayThanhToan, tienDua, trangThai) => {
  return custom.put(`/hoa-don/update-payment/${idHd}`, {
    ngayThanhToan,
    tienDua,
    trangThai,
  });
};
const getDetailHDCT = (idHd) => {
  return custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);
};
const addPayment = (idHd, hinhThuc, moTa, trangThai) => {
  return custom.post("/hinh-thuc-thanh-toan/add", {
    idHd,
    hinhThuc,
    moTa,
    trangThai,
  });
};
const getListHTTT = (idHd) => {
  return custom.get(`/hinh-thuc-thanh-toan/view-all-list/${idHd}`);
};
const listHTTTByID = (idHd) => {
  return custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);
};
export {
  listHTTTByID,
  updateStatusBill,
  getDetailHDCT,
  addPayment,
  updatePayment,
  getListHTTT,
};
