import custom from "./custom-axios";
const fetchAllSize = (page) => {
  return custom.get(`/size/view-all?p=${page}`); // Call API
};

const fetchSize = () => {
  return custom.get(`/size/listSize`); // Call API
};

const detailSize = (idSize) => {
  return custom.get(`/size/detail/${idSize}`); // Call API
};

const postAddSize = (maSize, tenSize, trangThai) => {
  return custom.post("/size/add", { maSize, tenSize, trangThai });
};
const deleteSize = (id) => {
  return custom.delete(`/size/delete/${id}`);
};

const putUpdateSize = (idSize, maSize, tenSize, trangThai) => {
  return custom.put(`/size/update`, { idSize, maSize, tenSize, trangThai });
};

export {
  fetchAllSize,
  fetchSize,
  detailSize,
  postAddSize,
  deleteSize,
  putUpdateSize,
};
