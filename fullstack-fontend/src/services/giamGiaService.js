import custom from './custom-axios';

const getAll = (pageNo, size) => {
    return custom.get(`/giam-gia-chi-tiet/api/view-all?page=${pageNo}&size=${size}`);
}

const detailGiamGia = (id) => {
    return custom.get(`/giam-gia/api/detail/${id}`);
}

const detailChiTietSanPham = (id) => {
    return custom.get(`/chi-tiet-san-pham/detail/${id}`);
}

const getCtspByIdSp = (id) => {
    return custom.get(`/chi-tiet-san-pham/select-ctsp-byid/${id}`);
}

const getAllByTrangThai = (pageNo, size, trangThai) => {
    return custom.get(`/giam-gia-chi-tiet/api/views?page=${pageNo}&size=${size}&trangThai=${trangThai}`);
} 

const search = (pageNo, size, value) => {
    return custom.get(`/giam-gia-chi-tiet/api/search?page=${pageNo}&size=${size}&value=${value}`);
}

const filerDate = (pageNo, size, first, last) => {
    return custom.get(`/giam-gia-chi-tiet/api/filter-date?page=${pageNo}&size=${size}&first=${first}&last=${last}`);
}

const getAllSanPham = () => {
    return custom.get(`/san-pham/listSP`);
}

// const getAllLoaiSp = () => {
//     return custom.get(`/loai-sp/api/views`);
// }

const detail = (id) => {
    return custom.get(`/giam-gia-chi-tiet/api/detail/${id}`);
}

const remove = (id) => {
    return custom.delete(`/giam-gia-chi-tiet/api/remove/${id}`);
}

const add = (giamGiaChiTiet) => {
    return custom.post(`/giam-gia-chi-tiet/api/insert`, giamGiaChiTiet);
}

const addGiamGia = (giamGia) => {
    return custom.post(`/giam-gia/api/insert`, giamGia);
}

const addLichSuGiamGia = (lsGiamGia) => {
    return custom.post(`/lich-su-giam-gia/api/insert`, lsGiamGia);
}

const update = (giamGiaChiTiet, id) => {
    return custom.put(`/giam-gia-chi-tiet/api/update/${id}`, giamGiaChiTiet);
}

export {getAll, detail, remove, add, update, addGiamGia, addLichSuGiamGia, getAllByTrangThai, search, filerDate, getAllSanPham, detailGiamGia, detailChiTietSanPham, getCtspByIdSp};