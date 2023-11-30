import custom from '../custom-axios';

const listProductOnCart = (idKH) => custom.get(`/gio-hang-chi-tiet/view-all/${idKH}`);
// const addProductOnCart = (idSp, { addGHCT }) => custom.post(`/gio-hang-chi-tiet/add/${idSp}`, { addGHCT });
const addProductOnCart = (idKH, idCtsp, soLuong) => custom.post(`/gio-hang-chi-tiet/add/${idKH}`, { idCtsp, soLuong });
const upadteProductOnCart = (idSp, soLuong) => custom.put(`/gio-hang-chi-tiet/update/${idSp}`, { soLuong });
const deleteProductOnCart = (idGHCT) => custom.delete(`/gio-hang-chi-tiet/delete/${idGHCT}`);
// Add Bill
const postAddBillAddBill = (idKH, kieuHoaDon, trangThai) =>
  custom.post('/hoa-don/add', { idKH, kieuHoaDon, trangThai });
const postAddDirectClient = (idHd, newHDCT) => custom.post(`/gio-hang-chi-tiet/add-to-hdct/${idHd}`, newHDCT);
export {
  postAddDirectClient,
  listProductOnCart,
  postAddBillAddBill,
  deleteProductOnCart,
  addProductOnCart,
  upadteProductOnCart,
};
