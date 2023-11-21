import custom from "./custom-axios";

const chucVu = () => {
  return custom.get(`/chuc-vu/view-all`); // Call API
};
const chucVu3 = () => {
  return custom.get(`/chuc-vu/list-chuc-vu`); // Call API
};
const chucVu2 = ( trangThai) => {
  return custom.get(`/tai-khoan/view-alls?trangThai=${trangThai}`); // Call API
};
const postAddChucVu = (maCv, tenCv, ngayTao, trangThai) => {
  return custom.post("/chuc-vu/add", { maCv, tenCv, ngayTao ,trangThai});
};
const deleteChucVu = (id) => {
  return custom.delete(`/chuc-vu/delete/${id}`);
};
const detail = (id) => {
  return custom.get(`/chuc-vu/detail/${id}`);
}

const detailTen = (params) => {
  return custom.get(`/chuc-vu/detailTen`, { params });
}

export {detail, chucVu, postAddChucVu, deleteChucVu, chucVu2, chucVu3 ,detailTen};
