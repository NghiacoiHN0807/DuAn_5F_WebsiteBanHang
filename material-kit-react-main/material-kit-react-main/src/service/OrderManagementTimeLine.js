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

const updateTongTien = (idHd, tongTien) =>
  custom.put(`/hoa-don/update-tong-tien/${idHd}`, {
    tongTien,
  });

const updatePaymentShip = (idHd, tenKh, sdtKh, ngayThanhToan, diaChi, thanhTien, kieuHoaDon, trangThai) =>
  custom.put(`/hoa-don/update-ship-online/${idHd}`, {
    tenKh,
    sdtKh,
    ngayThanhToan,
    diaChi,
    thanhTien,
    kieuHoaDon,
    trangThai,
  });

const updateKH = (idHd, idTaiKhoan) =>
  custom.put(`/hoa-don/update-khach-hang/${idHd}`, {
    idTaiKhoan,
  });
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
  listHTTTByID,
  updateStatusBill,
  getDetailHDCT,
  addPayment,
  updatePayment,
  updatePaymentShip,
  viewAllHTTT,
  updateKH,
};
