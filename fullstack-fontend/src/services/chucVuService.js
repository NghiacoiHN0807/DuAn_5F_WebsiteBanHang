import custom from "./custom-axios";
const chucVu = (page) => {
  return custom.get(`/chuc-vu/view-all?p=${page}`); // Call API
};
const chucVu3 = () => {
  return custom.get(`/chuc-vu/list-chuc-vu`); // Call API
};
const chucVu2 = (page, trangThai) => {
  return custom.get(`/tai-khoan/view-alls?p=${page}&trangThai=${trangThai}`); // Call API
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
export {detail, chucVu, postAddChucVu, deleteChucVu, chucVu2, chucVu3 };
