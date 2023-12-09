import custom from './custom-axios';

const fetchAllTKKH = (page, keyword) => custom.get(`/tai-khoan-khach-hang/view-all?p=${page}&keyword=${keyword}`); // Call API

const postAddTaiKhoanKhachHang = (maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) =>
  custom.post('/tai-khoan-khach-hang/add', { maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai });

const postSignUp = (maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) =>
  custom.post("/signUp", { maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai });
const postForgetPassword = (email) =>
  custom.post("/forgetPassword", { email });

const postUpdateTaiKhoanKhachHang = (idTaiKhoan, maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) =>
  custom.post('/tai-khoan-khach-hang/update', {
    idTaiKhoan,
    maTaiKhoan,
    ho,
    ten,
    sdt,
    email,
    matKhau,
    trangThai,
  });

const getDetailOneTK = (idTaiKhoan) => custom.get(`/tai-khoan-khach-hang/detail/${idTaiKhoan}`);

const deleteTaiKhoanKH = (id) =>
  custom.delete(`/tai-khoan-khach-hang/delete/${id}`);

export { fetchAllTKKH, postUpdateTaiKhoanKhachHang, postAddTaiKhoanKhachHang, deleteTaiKhoanKH, getDetailOneTK, postSignUp, postForgetPassword };
