import custom from "./custom-axios";

const fetchAnh = (idSp) => {
  return custom.get(`/anh/listAnh/${idSp}`); // Call API
};

const postAddAnh = (idSp, url, trangThai) => {
  return custom.post("/anh/add", { idSp, url, trangThai });
};

const deleteAnh = (id) => {
  return custom.delete(`/anh/delete/${id}`);
};

export { fetchAnh, postAddAnh, deleteAnh };
