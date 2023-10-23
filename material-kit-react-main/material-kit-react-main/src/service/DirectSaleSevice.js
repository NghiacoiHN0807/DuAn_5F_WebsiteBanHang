import custom from './custom-axios';

const getDetailOne = (idHd) => custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);

const getDataCart = (idHd) => custom.get(`/hoa-don-chi-tiet/detail/${idHd}`);

const postAddDirect = (idCtsp, soLuong, donGia, idHd, trangThai) =>
  custom.post('/hoa-don-chi-tiet/add', {
    idCtsp,
    soLuong,
    donGia,
    idHd,
    trangThai,
  });

const updateCart = (idHdct, idCtsp, soLuong, donGia) =>
  custom.put(`/hoa-don-chi-tiet/update/${idHdct}`, {
    idCtsp,
    soLuong,
    donGia,
  });

const deleteProductOnCart = (idHdct) => custom.delete(`/hoa-don-chi-tiet/delete/${idHdct}`);

export { updateCart, getDataCart, postAddDirect, getDetailOne, deleteProductOnCart };
