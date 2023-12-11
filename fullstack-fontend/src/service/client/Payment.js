import custom from '../custom-axios';

const selectDiaChiByTK = (maTaiKhoan) => custom.get(`/dia-chi/tai-khoan/?m=${maTaiKhoan}`);
const updateClientPayment = (idHd, tenKh, sdtKh, diaChi) =>
  custom.put(`/hoa-don/update-client-payment/${idHd}`, {
    tenKh,
    sdtKh,
    diaChi,
  });
const paymentOnlineClient = (amount, orderInfo) =>
  custom.post(`/hoa-don/submitOrder?amount=${amount}&orderInfo=${orderInfo}`);
export { selectDiaChiByTK, updateClientPayment, paymentOnlineClient };
