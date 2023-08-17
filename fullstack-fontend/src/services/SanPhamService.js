import custom from "./custom-axios";
const fetchAllSP = (page) => {
  return custom.get(`/san-pham/view-all?p=${page}`); // Call API
};

const fetchSpWithImg = (page) => {
  return custom.get(`/san-pham/getSpWithImg?p=${page}`); // Call API
};

const fetchSP = () => {
  return custom.get(`/san-pham/listSP`); // Call API
};

const detailSP = (idSp) => {
  return custom.get(`/san-pham/detail/${idSp}`); // Call API
};

const postAddSanPham = (
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
  trangThai
) => {
  return custom.post("/san-pham/add", {
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
};
const deleteSanPham = (id) => {
  return custom.delete(`/san-pham/delete/${id}`);
};

const putUpdateSanPham = (
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
  trangThai
) => {
  return custom.put(`/san-pham/update`, {
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
};

export {
  fetchAllSP,
  fetchSP,
  detailSP,
  postAddSanPham,
  deleteSanPham,
  putUpdateSanPham,
  fetchSpWithImg,
};
