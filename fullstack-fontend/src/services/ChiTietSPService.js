import custom from "./custom-axios";
const fetchAllCTSP = (page) => {
  return custom.get(`/chi-tiet-san-pham/view-all?p=${page}`); // Call API
};

const fetchCL = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listCL`); // Call API
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

const fetchXX = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listXX`); // Call API
};

const fetchTayAo = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listTayAo`); // Call API
};

const fetchCoAo = () => {
  return custom.get(`/chi-tiet-san-pham/view-all/listCoAo`); // Call API
};

const postAddCTSP = (
  maCtsp,
  idCl
  // idMs,
  // idSize,
  // idSp,
  // idLsp,
  // idXx,
  // idLoaiCoAo,
  // moTa,
  // soLuongTon,
  // giaNhap,
  // giaBan,
  // anh,
  // trangThai
) => {
  return custom.post("/chi-tiet-san-pham/add", {
    maCtsp,
    idCl,
    // idMs,
    // idSize,
    // idSp,
    // idLsp,
    // idXx,
    // idLoaiCoAo,
    // moTa,
    // soLuongTon,
    // giaNhap,
    // giaBan,
    // anh,
    // trangThai,
  });
};
const deleteCTSP = (id) => {
  return custom.delete(`/chi-tiet-san-pham/delete/${id}`);
};
export {
  fetchAllCTSP,
  postAddCTSP,
  deleteCTSP,
  fetchCL,
  fetchMS,
  fetchSize,
  fetchSP,
  fetchLSP,
  fetchXX,
  fetchTayAo,
  fetchCoAo,
};
