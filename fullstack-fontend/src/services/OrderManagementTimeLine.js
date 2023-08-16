import custom from "./custom-axios";
const updateStatusBill = (idHd, trangThai) => {
  return custom.put(`/hoa-don/update-status/${idHd}`, { trangThai });
};
const updatePayment = (
  idHd,
  tenKh,
  sdtKh,
  ngayThanhToan,
  thanhTien,
  tienDua,
  tienThua,
  trangThai
) => {
  return custom.put(`/hoa-don/update-payment/${idHd}`, {
    tenKh,
    sdtKh,
    ngayThanhToan,
    thanhTien,
    tienDua,
    tienThua,
    trangThai,
  });
};
const updatePaymentShip = (
  idHd,
  tenKh,
  sdtKh,
  ngayThanhToan,
  diaChi,
  thanhTien,
  kieuHoaDon,
  trangThai
) => {
  return custom.put(`/hoa-don/update-ship-online/${idHd}`, {
    tenKh,
    sdtKh,
    ngayThanhToan,
    diaChi,
    thanhTien,
    kieuHoaDon,
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
const listHTTTByID = (idHd) => {
  return custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);
};
export {
  listHTTTByID,
  updateStatusBill,
  getDetailHDCT,
  addPayment,
  updatePayment,
  updatePaymentShip,
};
