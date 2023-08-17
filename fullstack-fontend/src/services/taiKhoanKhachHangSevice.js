import custom from "./custom-axios";

const fetchAllTKKH = (page, keyword) => {
    return custom.get(`/tai-khoan-khach-hang/view-all?p=${page}&keyword=${keyword}`); // Call API
};
const postAddTaiKhoanKhachHang = (maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) => {
    return custom.post("/tai-khoan-khach-hang/add", {maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai});
};
const postUpdateTaiKhoanKhachHang = (idTaiKhoan, maTaiKhoan, ho, ten, sdt, email, matKhau, trangThai) => {
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
const getDetailOneTK = (idTaiKhoan) => {
    return custom.get(`/tai-khoan-khach-hang/detail/${idTaiKhoan}`);
};



const deleteTaiKhoanKH = (id) => {
    return custom.delete(`/tai-khoan-khach-hang/delete/${id}`);
};

export {fetchAllTKKH,postUpdateTaiKhoanKhachHang, postAddTaiKhoanKhachHang, deleteTaiKhoanKH,getDetailOneTK};
