import custom from "./custom-axios";
const fetchAllSP = (page) => {
  return custom.get(`/san-pham/view-all?p=${page}`); // Call API
};

const fetchSP = () => {
  return custom.get(`/san-pham/listSP`); // Call API
};

const detailSP = (idSp) => {
  return custom.get(`/san-pham/detail/${idSp}`); // Call API
};

const postAddSanPham = (maSp, tenSp, trangThai) => {
  return custom.post("/san-pham/add", { maSp, tenSp, trangThai });
};
const deleteSanPham = (id) => {
  return custom.delete(`/san-pham/delete/${id}`);
};

const putUpdateSanPham = (idSp, maSp, tenSp, trangThai) => {
  return custom.put(`/san-pham/update`, { idSp, maSp, tenSp, trangThai });
};

export {
  fetchAllSP,
  fetchSP,
  detailSP,
  postAddSanPham,
  deleteSanPham,
  putUpdateSanPham,
};
