import custom from '../custom-axios';

const listProductOnCart = (idSp) => custom.get(`/gio-hang-chi-tiet/view-all/${idSp}`);
// const addProductOnCart = (idSp, { addGHCT }) => custom.post(`/gio-hang-chi-tiet/add/${idSp}`, { addGHCT });
const addProductOnCart = (idKH, idCtsp, soLuong) => custom.post(`/gio-hang-chi-tiet/add/${idKH}`, { idCtsp, soLuong });
const upadteProductOnCart = (idSp, soLuong) => custom.put(`/gio-hang-chi-tiet/update/${idSp}`, { soLuong });
const deleteProductOnCart = (idGHCT) => custom.delete(`/gio-hang-chi-tiet/delete/${idGHCT}`);

export { listProductOnCart, deleteProductOnCart, addProductOnCart, upadteProductOnCart };
