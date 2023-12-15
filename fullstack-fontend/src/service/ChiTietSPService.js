import custom from './custom-axios';

const fetchAllCTSP = (page) => {
  custom.get(`/chi-tiet-san-pham/view-all?p=${page}`); // Call API
};

const findCtspById = (id) => custom.get(`chi-tiet-san-pham/select-ctsp-byId/${id}`);

const fetchListAtt = (id) => custom.get(`chi-tiet-san-pham/getCstpForAd/${id}`);

const detailCTSP = (id) => custom.get(`chi-tiet-san-pham/detail/${id}`);

const postAddCTSP = (idSp, idSize, soLuongTon, trangThai, soLuong) =>
  custom.post(`/chi-tiet-san-pham/add/${soLuong}`, {
    idSp,
    idSize,
    soLuongTon,
    trangThai,
  });

const deleteCTSP = (id) => custom.put(`/chi-tiet-san-pham/delete/${id}`);

const putUpdateCTSP = (idCtsp, idSize, idSp, soLuongTon, trangThai) =>
  custom.put(`/chi-tiet-san-pham/update`, {
    idCtsp,
    idSize,
    idSp,
    soLuongTon,
    trangThai,
  });

const addColorAndSize = (idSp, idMs, idSize) =>
  custom.post(`/chi-tiet-san-pham/addColorAndSize/${idSp}/${idMs}/${idSize}`, {
    idSp,
    idMs,
    idSize,
  });

const updateNumber = (idCtsp, giaNhap, giaBan, soLuongTon, trangThai) =>
  custom.put(`/chi-tiet-san-pham/updateNumber/${idCtsp}/${giaNhap}/${giaBan}/${soLuongTon}/${trangThai}`, {
    idCtsp,
    giaNhap,
    giaBan,
    soLuongTon,
    trangThai,
  });

export {
  fetchAllCTSP,
  postAddCTSP,
  deleteCTSP,
  putUpdateCTSP,
  findCtspById,
  addColorAndSize,
  updateNumber,
  detailCTSP,
  fetchListAtt,
};
