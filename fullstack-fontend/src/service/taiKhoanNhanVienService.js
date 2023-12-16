import custom from './custom-axios';

const taiKhoan = () => custom.get(`/tai-khoan/view-all`); // Call API

const taiKhoan2 = (page, trangThai) => custom.get(`/tai-khoan/view-all?p=${page}&trangThai=${trangThai}`); // Call API

const postAddTaiKhoan = (maTaiKhoan, idChucVu, ho, ten, sdt, email, soCanCuoc, matKhau, trangThai) =>
  custom.post('/tai-khoan/add', { maTaiKhoan, idChucVu, ho, ten, sdt, email, soCanCuoc, matKhau, trangThai });

const postUpdateTaiKhoan = (id, maTaiKhoan, idChucVu, ho, ten, sdt, email, matKhau, soCanCuoc, trangThai) =>
  custom.put(`/tai-khoan/update/${id}`, { maTaiKhoan, idChucVu, ho, ten, sdt, email, matKhau, soCanCuoc, trangThai });

const deleteTaiKhoan = (id, trangThai) => custom.delete(`/tai-khoan/delete/${id}/${trangThai}`);

const detailTaiKhoan = (id) => custom.get(`/tai-khoan/detail/${id}`);

const postChangePassTaiKhoan= (idTaiKhoan, maTaiKhoan, idChucVu, ho, ten, sdt, email, matKhau, soCanCuoc, trangThai,pass,passChange) =>
    custom.post(`/tai-khoan/changePass?pass=${pass}&newPass=${passChange}`, {
        idTaiKhoan,
        maTaiKhoan,
        idChucVu,
        ho,
        ten,
        sdt,
        email,
        matKhau,
        soCanCuoc,
        trangThai,
    });

export { taiKhoan, postAddTaiKhoan, deleteTaiKhoan, postUpdateTaiKhoan, detailTaiKhoan, taiKhoan2,postChangePassTaiKhoan };
