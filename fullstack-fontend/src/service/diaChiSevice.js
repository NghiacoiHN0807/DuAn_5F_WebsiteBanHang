import custom from "./custom-axios";

const fetchAllDiaChi = (page) =>
    custom.get(`/dia-chi/view-all?p=${page}`); // Call API

const fetchDiaChiByTK = (maTaiKhoan) =>
    custom.get(`/dia-chi/tai-khoan-client/?m=${maTaiKhoan}`); // Call API
const fetchDiaChiByTkAll = (maTaiKhoan) =>
    custom.get(`/dia-chi/tai-khoan/?m=${maTaiKhoan}`);
const fetchCountDiaChi = (maTaiKhoan) =>
    custom.get(`/dia-chi/tai-khoan-count/?m=${maTaiKhoan}`); // Call API

const postAddDiaChi = (taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh,phiShip, trangThai) =>
    custom.post("/dia-chi/add", {
        taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh,phiShip, trangThai
    });

const postUpdateDiaChi = (
    id, taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh,phiShip, trangThai) =>
    custom.post("/dia-chi/update",
        {
            id, taiKhoan, diaChiCuThe, loaiDiaChi, phuongXa, quanHuyen, sdt, tenNguoiNhan, tinhThanh,phiShip, trangThai
        });

const getDiaChiById = (id) =>
    custom.get(`/dia-chi/detail/${id}`); // Call API


const deleteDiaChi = (id) =>
    custom.delete(`/dia-chi/delete/${id}`);


export {fetchAllDiaChi, postAddDiaChi, postUpdateDiaChi, deleteDiaChi, fetchDiaChiByTK, getDiaChiById,fetchDiaChiByTkAll,fetchCountDiaChi};
