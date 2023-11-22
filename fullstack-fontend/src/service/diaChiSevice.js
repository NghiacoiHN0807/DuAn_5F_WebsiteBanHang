import custom from "./custom-axios";

const fetchAllDiaChi = (page) =>
    custom.get(`/dia-chi/view-all?p=${page}`); // Call API

const fetchDiaChiByTK = (maTaiKhoan, page) =>
    custom.get(`/dia-chi/tai-khoan/?m=${maTaiKhoan}&p=${page}`); // Call API

const postAddDiaChi = (taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh, trangThai) =>
    custom.post("/dia-chi/add", {
        taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh, trangThai
    });

const postUpdateDiaChi = (
    id, taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh, trangThai) =>
    custom.post("/dia-chi/update",
        {
            id, taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh, trangThai
        });

const getDiaChiById = (id) =>
    custom.get(`/dia-chi/detail/${id}`); // Call API


const deleteDiaChi = (id) =>
    custom.delete(`/dia-chi/delete/${id}`);


export {fetchAllDiaChi, postAddDiaChi, postUpdateDiaChi, deleteDiaChi, fetchDiaChiByTK, getDiaChiById};
