import custom from "./custom-axios";

const chucVu = () => custom.get(`/chuc-vu/view-all`); // Call API

const chucVu3 = () => custom.get(`/chuc-vu/list-chuc-vu`); // Call API

const chucVu2 = (trangThai) => custom.get(`/tai-khoan/view-alls?trangThai=${trangThai}`); // Call API

const postAddChucVu = (maCv, tenCv, ngayTao, trangThai) =>
  custom.post("/chuc-vu/add", { maCv, tenCv, ngayTao, trangThai });

const deleteChucVu = (id) => custom.delete(`/chuc-vu/delete/${id}`);

const detail = (id) => custom.get(`/chuc-vu/detail/${id}`);

const detailTen = (params) => custom.get(`/chuc-vu/detailTen`, { params });

export { detail, chucVu, postAddChucVu, deleteChucVu, chucVu2, chucVu3, detailTen };
