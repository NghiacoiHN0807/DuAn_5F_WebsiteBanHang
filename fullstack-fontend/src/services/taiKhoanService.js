import custom from "./custom-axios";
const taiKhoan = (page) => {
  return custom.get(`/tai-khoan/view-all?p=${page}`); // Call API
};
const taiKhoan2 = (page, trangThai) => {
  return custom.get(`/tai-khoan/view-all?p=${page}&trangThai=${trangThai}`); // Call API
};
const postAddTaiKhoan = (
  maTaiKhoan,
  idChucVu,
  ho,
  ten,
  sdt,
  email,
  soCanCuoc,
  trangThai
) => {
  return custom.post("/tai-khoan/add", {
    maTaiKhoan,
    idChucVu,
    ho,
    ten,
    sdt,
    email,
    soCanCuoc,
    trangThai,
  });
};
const postUpdateTaiKhoan = (
  id,
  maTaiKhoan,
  idChucVu,
  ho,
  ten,
  sdt,
  email,
  matKhau,
  soCanCuoc,
  trangThai
) => {
  return custom.put(`/tai-khoan/update/${id}`, {
    maTaiKhoan,
    idChucVu,
    ho,
    ten,
    sdt,
    email,
    matKhau,
    soCanCuoc,
    trangThai
  });
};
const deleteTaiKhoan = (id) => {
  return custom.put(`/tai-khoan/delete/${id}`);
};
const detailTaiKhoan = (id) => {
  return custom.get(`/tai-khoan/detail/${id}`);
};
export {
  taiKhoan,
  postAddTaiKhoan,
  deleteTaiKhoan,
  postUpdateTaiKhoan,
  detailTaiKhoan,
  taiKhoan2,
};
