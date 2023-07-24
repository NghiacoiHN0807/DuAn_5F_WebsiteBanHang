import custom from "./custom-axios";
const fetchAllCTSP = (page) => {
  return custom.get(`/chi-tiet-san-pham/view-all?p=${page}`); // Call API
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

export { fetchAllCTSP, postAddCTSP, deleteCTSP, putUpdateCTSP };
