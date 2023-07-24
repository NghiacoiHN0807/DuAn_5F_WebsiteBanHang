import custom from "./custom-axios";
const fetchAllCoAo = (page) => {
  return custom.get(`/loai-co-ao/view-all?p=${page}`); // Call API
};

const fetchCoAo = () => {
  return custom.get(`/loai-co-ao/listCoAo`); // Call API
};

const detailCoAo = (idCoAo) => {
  return custom.get(`/loai-co-ao/detail/${idCoAo}`); // Call API
};

const postAddLoaiCoAo = (maCoAo, loaiCoAo, trangThai) => {
  return custom.post("/loai-co-ao/add", { maCoAo, loaiCoAo, trangThai });
};
const deleteLoaiCoAo = (id) => {
  return custom.delete(`/loai-co-ao/delete/${id}`);
};

const putUpdateLoaiCoAo = (idCoAo, maCoAo, loaiCoAo, trangThai) => {
  return custom.put(`/loai-co-ao/update`, {
    idCoAo,
    maCoAo,
    loaiCoAo,
    trangThai,
  });
};

export {
  fetchAllCoAo,
  fetchCoAo,
  detailCoAo,
  postAddLoaiCoAo,
  deleteLoaiCoAo,
  putUpdateLoaiCoAo,
};
