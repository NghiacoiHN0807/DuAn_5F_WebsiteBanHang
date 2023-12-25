import custom from '../custom-axios';

const listProductOnCart = (idKH) => custom.get(`/gio-hang-chi-tiet/view-all/${idKH}`);
// const addProductOnCart = (idSp, { addGHCT }) => custom.post(`/gio-hang-chi-tiet/add/${idSp}`, { addGHCT });
const addProductOnCart = (idKH, idCtsp, soLuong) => custom.post(`/gio-hang-chi-tiet/add/${idKH}`, { idCtsp, soLuong });
const upadteProductOnCart = (idSp, idGh, soLuong) =>
  custom.put(`/gio-hang-chi-tiet/update/${idSp}/${idGh}`, { soLuong });
const deleteProductOnCart = (idGHCT) => custom.delete(`/gio-hang-chi-tiet/delete/${idGHCT}`);
// Add Bill
const postAddBillAddBill = (idKH, tongTien, kieuHoaDon, trangThai) =>
  custom.post('/hoa-don/add', { idKH, tongTien, kieuHoaDon, trangThai });
const postAddBillNoAccount = (tongTien, kieuHoaDon, trangThai) =>
  custom.post('/hoa-don/add', { tongTien, kieuHoaDon, trangThai });

const postAddDirectClient = (idHd, newHDCT) => custom.post(`/gio-hang-chi-tiet/add-to-hdct/${idHd}`, newHDCT);
const updateCartClient = (idHdct, idCtsp, soLuong) =>
  custom.put(`/gio-hang-chi-tiet/update-product/${idHdct}`, {
    idCtsp,
    soLuong,
  });
export {
  postAddDirectClient,
  listProductOnCart,
  postAddBillAddBill,
  deleteProductOnCart,
  addProductOnCart,
  upadteProductOnCart,
  updateCartClient,
  postAddBillNoAccount,
};
