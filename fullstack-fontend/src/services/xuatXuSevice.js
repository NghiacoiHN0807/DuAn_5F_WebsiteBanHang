import custom from "./custom-axios";
const fetchAllXX = (page) => {
  return custom.get(`/xuat-xu/view-all?p=${page}`); // Call API
};
const postAddXuatXu = (maXx, tenNuoc, tinhTrang) => {
  return custom.post("/xuat-xu/add", { maXx, tenNuoc, tinhTrang });
};
const deleteXuatXu = (id) => {
  return custom.delete(`/xuat-xu/delete/${id}`);
};
export { fetchAllXX, postAddXuatXu, deleteXuatXu };
