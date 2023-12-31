import custom from "./custom-axios";

const fetchAllSP = (page) => custom.get(`/san-pham/view-all?p=${page}`); // Call API

const fetchSpWithImg = (page) => custom.get(`/san-pham/getSpWithImg?p=${page}`); // Call API

const fetchSP = () => custom.get(`/san-pham/listSP`); // Call API

const detailSP = (idSp) => custom.get(`/san-pham/detail/${idSp}`); // Call API

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
) => custom.post("/san-pham/add", {
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
) => custom.put(`/san-pham/update`, {
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

const topSpTrending = () => custom.get('/san-pham/top-sp-trend'); // Thay đổi URL dựa trên định nghĩa URL API của bạn
export {
  fetchAllSP,
  fetchSP,
  detailSP,
  postAddSanPham,
  deleteSanPham,
  putUpdateSanPham,
  fetchSpWithImg,
  topSpTrending,
};