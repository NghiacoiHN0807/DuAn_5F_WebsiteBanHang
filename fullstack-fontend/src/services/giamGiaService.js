import custom from './custom-axios';

const getAll = (pageNo, size, trangThai) => {
    return custom.get(`/giam-gia-chi-tiet/api/views?page=${pageNo}&size=${size}&trangThai=${trangThai}`);
}

const getAllLoaiSp = () => {
    return custom.get(`/loai-sp/api/views`);
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

const addGiamGia = (giamGia) => {
    return custom.post(`/giam-gia/api/insert`, giamGia);
}

const addLichSuGiamGia = (lsGiamGia) => {
    return custom.post(`/lich-su-giam-gia/api/insert`, lsGiamGia);
}

const update = (giamGiaChiTiet, id) => {
    return custom.put(`/giam-gia-chi-tiet/api/update/${id}`, giamGiaChiTiet);
}

export {getAll, detail, remove, add, update, getAllLoaiSp, addGiamGia, addLichSuGiamGia};