import custom from './custom-axios';

const updateStatusBill = (idHd, moTa, trangThai) =>
  custom.put(`/hoa-don/update-status/${idHd}?moTa=${moTa}`, {
    moTa,
    trangThai,
  });

const updatePayment = (idHd, tenKh, sdtKh, ngayThanhToan, thanhTien, tienDua, tienThua, trangThai) =>
  custom.put(`/hoa-don/update-payment/${idHd}`, {
    tenKh,
    sdtKh,
    ngayThanhToan,
    thanhTien,
    tienDua,
    tienThua,
    trangThai,
  });

const updateTongTien = (idHd, tongTien, tienShip, thanhTien) =>
  custom.put(`/hoa-don/update-tong-tien/${idHd}`, {
    tongTien,
    tienShip,
    thanhTien,
  });

const updateTienShip = (idHd, tienShip) =>
  custom.put(`/hoa-don/update-tien-ship/${idHd}`, {
    tienShip,
  });

const updatePaymentShip = (idHd, tenKh, sdtKh, email, diaChi, thanhTien, kieuHoaDon, trangThai) =>
  custom.put(`/hoa-don/update-ship-online/${idHd}`, {
    tenKh,
    sdtKh,
    email,
    diaChi,
    thanhTien,
    kieuHoaDon,
    trangThai,
  });

const updateKH = (idHd, idTaiKhoan) =>
  custom.put(`/hoa-don/update-khach-hang/${idHd}`, {
    idTaiKhoan,
  });
const updateKH1 = (idHd) => custom.put(`/hoa-don/update-khach-hang1/${idHd}`);
const getDetailHDCT = (idHd) => custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);

const viewAllHTTT = (idHd) => custom.get(`/hinh-thuc-thanh-toan/view-all-list/${idHd}`);

const addPayment = (idHd, hinhThuc, moTa, trangThai) =>
  custom.post('/hinh-thuc-thanh-toan/add', {
    idHd,
    hinhThuc,
    moTa,
    trangThai,
  });

const listHTTTByID = (idHd) => custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);

export {
  updateTongTien,
  updateKH1,
  listHTTTByID,
  updateStatusBill,
  getDetailHDCT,
  addPayment,
  updatePayment,
  updatePaymentShip,
  viewAllHTTT,
  updateKH,
  updateTienShip,
};
