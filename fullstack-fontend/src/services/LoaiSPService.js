import custom from "./custom-axios";
const fetchAllLSP = (page) => {
  return custom.get(`/loai-sp/view-all?p=${page}`); // Call API
};

const fetchLSP = () => {
  return custom.get(`/loai-sp/listLSP`); // Call API
};

const detailLSP = (idLsp) => {
  return custom.get(`/loai-sp/detail/${idLsp}`); // Call API
};

const postAddLoaiSP = (maLsp, tenLsp, trangThai) => {
  return custom.post("/loai-sp/add", { maLsp, tenLsp, trangThai });
};
const deleteLoaiSP = (id) => {
  return custom.delete(`/loai-sp/delete/${id}`);
};

const putUpdateLoaiSP = (idLoaisp, maLsp, tenLsp, trangThai) => {
  return custom.put(`/loai-sp/update`, { idLoaisp, maLsp, tenLsp, trangThai });
};

export {
  fetchAllLSP,
  fetchLSP,
  detailLSP,
  postAddLoaiSP,
  deleteLoaiSP,
  putUpdateLoaiSP,
};
