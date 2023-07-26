import custom from "./custom-axios";
const fetchAllXX = (page) => {
  return custom.get(`/xuat-xu/view-all?p=${page}`); // Call API
};

const fetchXX = () => {
  return custom.get(`/xuat-xu/listXX`); // Call API
};

const detailXX = (idXx) => {
  return custom.get(`/xuat-xu/detail/${idXx}`); // Call API
};

const postAddXuatXu = (maXx, tenNuoc, trangThai) => {
  return custom.post("/xuat-xu/add", { maXx, tenNuoc, trangThai });
};
const deleteXuatXu = (id) => {
  return custom.delete(`/xuat-xu/delete/${id}`);
};

const putUpdateXuatXu = (idXx, maXx, tenNuoc, trangThai) => {
  return custom.put(`/xuat-xu/update`, { idXx, maXx, tenNuoc, trangThai });
};

export {
  fetchAllXX,
  fetchXX,
  detailXX,
  postAddXuatXu,
  deleteXuatXu,
  putUpdateXuatXu,
};
