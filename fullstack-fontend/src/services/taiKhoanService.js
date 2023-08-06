import custom from "./custom-axios";
const taiKhoan = (page) => {
  return custom.get(`/tai-khoan/view-all?p=${page}`); // Call API
};
const taiKhoan2 = (page, trangThai) => {
  return custom.get(`/tai-khoan/view-alls?p=${page}&trangThai=${trangThai}`); // Call API
};
const postAddTaiKhoan = (maTaiKhoan, ho, ten, sdt, email,  trangThai) => {
  return custom.post("/tai-khoan/add", { maTaiKhoan, ho, ten, sdt, email,  trangThai });
};
const postUpdateTaiKhoan = (id,maTaiKhoan, ho, ten, sdt, email,  trangThai) => {
  return custom.put(`/tai-khoan/update/${id}`, {maTaiKhoan, ho, ten, sdt, email,  trangThai });
};
const deleteTaiKhoan = (id) => {
  return custom.delete(`/tai-khoan/delete/${id}`);
};
const detailTaiKhoan = (id) => {
  return custom.get(`/tai-khoan/detail/${id}`);
};
export { taiKhoan, postAddTaiKhoan, deleteTaiKhoan , postUpdateTaiKhoan, detailTaiKhoan, taiKhoan2};
