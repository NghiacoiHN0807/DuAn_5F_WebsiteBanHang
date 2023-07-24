import custom from "./custom-axios";
const fetchAllCTSP = (page) => {
  return custom.get(`/chi-tiet-san-pham/view-all?p=${page}`); // Call API
};

const fetchMS = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listMS`); // Call API
};

const fetchSize = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listSize`); // Call API
};

const fetchSP = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listSP`); // Call API
};

const fetchLSP = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listLSP`); // Call API
};

const fetchTayAo = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listTayAo`); // Call API
};

const fetchCoAo = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listCoAo`); // Call API
};

const detailMS = (idMs) => {
  return custom.get(`/mau-sac/detail/${idMs}`); // Call API
};

const detailSize = (idSize) => {
  return custom.get(`/size/detail/${idSize}`); // Call API
};

const detailSP = (idSp) => {
  return custom.get(`/san-pham/detail/${idSp}`); // Call API
};

const detailLoaiSP = (idLoaisp) => {
  return custom.get(`/loai-sp/detail/${idLoaisp}`); // Call API
};

const detailLoaiCoAo = (idCoAo) => {
  return custom.get(`/loai-co-ao/detail/${idCoAo}`); // Call API
};

const detailOngTayAo = (idTayAo) => {
  return custom.get(`/ong-tay-ao/detail/${idTayAo}`); // Call API
};

const postAddCTSP = (
  maCtsp,
  idCl,
  idMs,
  idSize,
  idSp,
  idLsp,
  idXx,
  idLoaiCoAo,
  idTayAo,
  moTa,
  soLuongTon,
  giaNhap,
  giaBan,
  trangThai
) => {
  return custom.post("/chi-tiet-san-pham/add", {
    maCtsp,
    idCl,
    idMs,
    idSize,
    idSp,
    idLsp,
    idXx,
    idLoaiCoAo,
    idTayAo,
    moTa,
    soLuongTon,
    giaNhap,
    giaBan,
    trangThai,
  });
};

const deleteCTSP = (id) => {
  return custom.delete(`/chi-tiet-san-pham/delete/${id}`);
};

const putUpdateCTSP = (
  idCtsp,
  maCtsp,
  idCl,
  idMs,
  idSize,
  idSp,
  idLsp,
  idXx,
  idLoaiCoAo,
  idTayAo,
  moTa,
  soLuongTon,
  giaNhap,
  giaBan,
  trangThai
) => {
  return custom.put(`/chi-tiet-san-pham/update/${idCtsp}`, {
    idCtsp,
    maCtsp,
    idCl,
    idMs,
    idSize,
    idSp,
    idLsp,
    idXx,
    idLoaiCoAo,
    idTayAo,
    moTa,
    soLuongTon,
    giaNhap,
    giaBan,
    trangThai,
  });
};

export {
  fetchAllCTSP,
  postAddCTSP,
  deleteCTSP,
  fetchMS,
  fetchSize,
  fetchSP,
  fetchLSP,
  fetchTayAo,
  fetchCoAo,
  detailMS,
  detailSize,
  detailSP,
  detailLoaiSP,
  detailOngTayAo,
  detailLoaiCoAo,
  putUpdateCTSP,
};
