import custom from "./custom-axios";

const fetchAllTKKH = (page) => {
    return custom.get(`/tai-khoan-khach-hang/view-all?p=${page}`); // Call API
};
const postAddTaiKhoanKhachHang = (maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) => {
    return custom.post("/tai-khoan-khach-hang/add", {maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai});
};
export const postUpdateTaiKhoanKhachHang = (idTaiKhoan, maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) => {
    return custom.post("/tai-khoan-khach-hang/update", {
        idTaiKhoan,
        maTaiKhoan,
        ho,
        ten,
        sdt,
        email,
        matKhau,
        trangThai
    });
};


const deleteTaiKhoan = (id) => {
    return custom.delete(`/tai-khoan-khach-hang/delete/${id}`);
};

export {fetchAllTKKH, postAddTaiKhoanKhachHang, deleteTaiKhoan};
