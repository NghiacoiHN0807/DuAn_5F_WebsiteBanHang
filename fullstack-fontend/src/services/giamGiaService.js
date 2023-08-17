import custom from './custom-axios';

const getAll = () => {
    return custom.get(`/giam-gia-chi-tiet/api/view-all`);
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
    return custom.get(`/san-pham/get-san-pham-by-trangThai?page=${pageNo}&size=${size}&trangThai=${trangThai}`);
} 

const search = (pageNo, size, value) => {
    return custom.get(`/giam-gia-chi-tiet/api/search?page=${pageNo}&size=${size}&value=${value}`);
}

const filerDate = (pageNo, size, first, last) => {
    return custom.get(`/giam-gia-chi-tiet/api/filter-date?page=${pageNo}&size=${size}&first=${first}&last=${last}`);
}

const getAllSanPham = (trangThai) => {
    return custom.get(`/san-pham/minimage?trangThai=${trangThai}`);
}

const getSanPhamDetails = (pageNo, size) => {
    return custom.get(`/san-pham/dto?page=${pageNo}&size=${size}`);
}

const detail = (id) => {
    return custom.get(`/giam-gia-chi-tiet/api/detail/${id}`);
}

const remove = (id) => {
    return custom.delete(`/giam-gia-chi-tiet/api/remove/${id}`);
}

const add = (giamGiaChiTiet) => {
return custom.post(`/giam-gia-chi-tiet/api/insert`, giamGiaChiTiet);
}

const addGiamGia = (request) => {
    return custom.post(`/giam-gia/api/insert`, request);
}

const addLichSuGiamGia = (lsGiamGia) => {
    return custom.post(`/lich-su-giam-gia/api/insert`, lsGiamGia);
}

const update = (giamGiaChiTiet, id) => {
    return custom.put(`/giam-gia-chi-tiet/api/update/${id}`, giamGiaChiTiet);
}

const updateGiamGia = (giamGia, id) => {
    return custom.put(`/giam-gia/api/update/${id}`, giamGia);
}

const getImgByIdSp = (idSp) => {
    return custom.get(`/images/select-byidSP?id=${idSp}`);
}


const getIdGiamGia = (id) => {
    return custom.get(`/giam-gia-chi-tiet/api/getidGiamGiaByIdggct/${id}`);
}

const updateSanPhamBytrangThai = (id, trangThai) => {
    return custom.put(`/san-pham/updateTrangThai_SanPham?id=${id}&trangThai=${trangThai}`);
}

export {updateSanPhamBytrangThai, getSanPhamDetails, getIdGiamGia, updateGiamGia, getImgByIdSp, getAll, detail, remove, add, update, addGiamGia, addLichSuGiamGia, getAllByTrangThai, search, filerDate, getAllSanPham, detailGiamGia, detailChiTietSanPham, getCtspByIdSp};