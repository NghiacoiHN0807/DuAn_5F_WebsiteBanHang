import custom from './custom-axios';

const fetchAllSP = (page) => custom.get(`/san-pham/view-all?p=${page}`); // Call API

const fetchSpWithImg = () => custom.get(`/san-pham/getSpWithImg`); // Call API

const fetchSP = () => custom.get(`/san-pham/listSP`); // Call API

const detailSP = (idSp) => custom.get(`/san-pham/detail/${idSp}`); // Call API

const postAddSanPham = (maSp, tenSp, idCl, idMs, idLsp, idXx, idCoAo, idTayAo, moTa, giaBan, trangThai) =>
  custom.post('/san-pham/add', {
    maSp,
    tenSp,
    idCl,
    idMs,
    idLsp,
    idXx,
    idCoAo,
    idTayAo,
    moTa,
    giaBan,
    trangThai,
  });

const deleteSanPham = (id) => custom.delete(`/san-pham/delete/${id}`);

const putUpdateSanPham = (idSp, maSp, tenSp, idCl, idMs, idLsp, idXx, idCoAo, idTayAo, moTa, giaBan, trangThai) =>
  custom.put(`/san-pham/update`, {
    idSp,
    maSp,
    tenSp,
    idCl,
    idMs,
    idLsp,
    idXx,
    idCoAo,
    idTayAo,
    moTa,
    giaBan,
    trangThai,
  });

export { fetchAllSP, fetchSP, detailSP, postAddSanPham, deleteSanPham, putUpdateSanPham, fetchSpWithImg };
