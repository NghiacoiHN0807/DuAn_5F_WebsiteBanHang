import custom from "./custom-axios";
const fetchAllXX = (page) => {
  return custom.get(`/tai-khoan-khach-hang/view-all?p=${page}`); // Call API
};
const postAddXuatXu = (maXx, tenNuoc, tinhTrang) => {
  return custom.post("/tai-khoan-khach-hang/add", { maXx, tenNuoc, tinhTrang });
};
const deleteXuatXu = (id) => {
  return custom.delete(`/tai-khoan-khach-hang/delete/${id}`);
};

export { fetchAllXX, postAddXuatXu, deleteXuatXu };
