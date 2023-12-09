import custom from './custom-axios';

const fetchAllSP = (page) => custom.get(`/san-pham/view-all?p=${page}`); // Call API

const fetchSpWithImg = () => custom.get(`/san-pham/getSpWithImg`); // Call API

const fetchSP = () => custom.get(`/san-pham/listSP`); // Call API

const detailSP = (idSp) => custom.get(`/san-pham/detail/${idSp}`); // Call API

const postAddSanPham = (maSp, tenSp, idCl, idLsp, idXx, idCoAo, idTayAo, moTa, trangThai) =>
  custom.post('/san-pham/add', {
    maSp,
    tenSp,
    idCl,
    idLsp,
    idXx,
    idCoAo,
    idTayAo,
    moTa,
    trangThai,
  });

const deleteSanPham = (id) => custom.delete(`/san-pham/delete/${id}`);

const putUpdateSanPham = (idSp, maSp, tenSp, idCl, idLsp, idXx, idCoAo, idTayAo, moTa, trangThai) =>
  custom.put(`/san-pham/update`, {
    idSp,
    maSp,
    tenSp,
    idCl,
    idLsp,
    idXx,
    idCoAo,
    idTayAo,
    moTa,
    trangThai,
  });

const fetchSpForClient = () => custom.get(`/san-pham/getSpForClient`);

const getTopSpBanChayForClient = () => custom.get(`/san-pham/getTopSpBanChayForClient`);

const getSpGiamGiaForClient = () => custom.get(`/san-pham/getSpGiamGiaForClient`);

const getRelatedSp = (idLsp, idSp) => custom.get(`/san-pham/sp-lien-quan/${idLsp}/${idSp}`);

export {
  fetchAllSP,
  fetchSP,
  detailSP,
  postAddSanPham,
  deleteSanPham,
  putUpdateSanPham,
  fetchSpWithImg,
  fetchSpForClient,
  getTopSpBanChayForClient,
  getSpGiamGiaForClient,
  getRelatedSp,
};
