import custom from './custom-axios';

<<<<<<< HEAD
const getAll = (pageNo, size) => {
    return custom.get(`/giam-gia-chi-tiet/api/view-all?page=${pageNo}&size=${size}`);
=======
const getAll = () => {
    return custom.get(`/giam-gia-chi-tiet/api/view-all`);
>>>>>>> main
}

const detailGiamGia = (id) => {
    return custom.get(`/giam-gia/api/detail/${id}`);
}

<<<<<<< HEAD
=======
const detailChiTietSanPham = (id) => {
    return custom.get(`/chi-tiet-san-pham/detail/${id}`);
}

const getCtspByIdSp = (id) => {
    return custom.get(`/chi-tiet-san-pham/select-ctsp-byid/${id}`);
}

>>>>>>> main
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
<<<<<<< HEAD
    return custom.get(`/san-pham/api/views`);
}

const getAllLoaiSp = () => {
    return custom.get(`/loai-sp/api/views`);
=======
    return custom.get(`/san-pham/minimage`);
}

const getSanPhamDetails = (pageNo, size) => {
    return custom.get(`/san-pham/dto?page=${pageNo}&size=${size}`);
>>>>>>> main
}

const detail = (id) => {
    return custom.get(`/giam-gia-chi-tiet/api/detail/${id}`);
}

const remove = (id) => {
    return custom.delete(`/giam-gia-chi-tiet/api/remove/${id}`);
}

const add = (giamGiaChiTiet) => {
<<<<<<< HEAD
    return custom.post(`/giam-gia-chi-tiet/api/insert`, giamGiaChiTiet);
}

const addGiamGia = (giamGia) => {
    return custom.post(`/giam-gia/api/insert`, giamGia);
=======
return custom.post(`/giam-gia-chi-tiet/api/insert`, giamGiaChiTiet);
}

const addGiamGia = (request) => {
    return custom.post(`/giam-gia/api/insert`, request);
>>>>>>> main
}

const addLichSuGiamGia = (lsGiamGia) => {
    return custom.post(`/lich-su-giam-gia/api/insert`, lsGiamGia);
}

const update = (giamGiaChiTiet, id) => {
    return custom.put(`/giam-gia-chi-tiet/api/update/${id}`, giamGiaChiTiet);
}

<<<<<<< HEAD
export {getAll, detail, remove, add, update, getAllLoaiSp, addGiamGia, addLichSuGiamGia, getAllByTrangThai, search, filerDate, getAllSanPham, detailGiamGia};
=======
const updateGiamGia = (giamGia, id) => {
    return custom.put(`/giam-gia/api/update/${id}`, giamGia);
}

const getImgByIdSp = (idSp) => {
    return custom.get(`/images/select-byidSP?id=${idSp}`);
}


const getIdGiamGia = (id) => {
    return custom.get(`/giam-gia-chi-tiet/api/getidGiamGiaByIdggct/${id}`);
}

export {getSanPhamDetails, getIdGiamGia, updateGiamGia, getImgByIdSp, getAll, detail, remove, add, update, addGiamGia, addLichSuGiamGia, getAllByTrangThai, search, filerDate, getAllSanPham, detailGiamGia, detailChiTietSanPham, getCtspByIdSp};
>>>>>>> main
