import custom from '../custom-axios';

<<<<<<< HEAD
const selectDiaChiByTK = (maTaiKhoan) => custom.get(`/dia-chi/tai-khoan-client/?m=${maTaiKhoan}`);
const updateClientPayment = (idHd, tenKh, sdtKh, diaChi) =>
=======
const selectDiaChiByTK = (maTaiKhoan) => custom.get(`/dia-chi/tai-khoan/?m=${maTaiKhoan}`);
const updateClientPayment = (idHd, tenKh, sdtKh, email, diaChi) =>
>>>>>>> origin/nghiant0807
  custom.put(`/hoa-don/update-client-payment/${idHd}`, {
    tenKh,
    sdtKh,
    email,
    diaChi,
  });

const updateClientPayment1 = (idHd, tenKh, sdtKh, email, diaChi) =>
  custom.put(`/hoa-don/update-client-payment1/${idHd}`, {
    tenKh,
    sdtKh,
    email,
    diaChi,
  });
const updateClientPayment2 = (idHd, tenKh, sdtKh, email, diaChi, tienShip) =>
  custom.put(`/hoa-don/update-khach-hang2/${idHd}`, {
    tenKh,
    sdtKh,
    email,
    diaChi,
    tienShip,
  });
const deleteProductOnCartPayment = (idHd) => custom.delete(`/gio-hang-chi-tiet/delete-product/${idHd}`);
const paymentOnlineClient = (amount, orderInfo) =>
  custom.post(`/hoa-don/submitOrder-client?amount=${amount}&orderInfo=${orderInfo}`);
export {
  updateClientPayment2,
  deleteProductOnCartPayment,
  selectDiaChiByTK,
  updateClientPayment,
  paymentOnlineClient,
  updateClientPayment1,
};
