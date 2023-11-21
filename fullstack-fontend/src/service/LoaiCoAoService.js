import custom from './custom-axios';

const fetchAllCoAo = (page) => custom.get(`/loai-co-ao/view-all?p=${page}`); // Call API

const fetchCoAo = () => custom.get(`/loai-co-ao/listCoAo`); // Call API

const detailCoAo = (idCoAo) => custom.get(`/loai-co-ao/detail/${idCoAo}`); // Call API

const postAddLoaiCoAo = (maCoAo, loaiCoAo, trangThai) =>
  custom.post('/loai-co-ao/add', { maCoAo, loaiCoAo, trangThai });

const deleteLoaiCoAo = (id) => custom.delete(`/loai-co-ao/delete/${id}`);

const putUpdateLoaiCoAo = (idCoAo, maCoAo, loaiCoAo, trangThai) =>
  custom.put(`/loai-co-ao/update`, {
    idCoAo,
    maCoAo,
    loaiCoAo,
    trangThai,
  });

export { fetchAllCoAo, fetchCoAo, detailCoAo, postAddLoaiCoAo, deleteLoaiCoAo, putUpdateLoaiCoAo };
