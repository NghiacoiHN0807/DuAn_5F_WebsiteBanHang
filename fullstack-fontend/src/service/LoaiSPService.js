import custom from './custom-axios';

const fetchAllLSP = (page) => custom.get(`/loai-sp/view-all?p=${page}`); // Call API

const fetchLSP = () => custom.get(`/loai-sp/listLSP`); // Call API

const detailLSP = (idLsp) => custom.get(`/loai-sp/detail/${idLsp}`); // Call API

const postAddLoaiSP = (maLsp, tenLsp, trangThai) => custom.post('/loai-sp/add', { maLsp, tenLsp, trangThai });

const deleteLoaiSP = (id) => custom.delete(`/loai-sp/delete/${id}`);

const putUpdateLoaiSP = (idLoaisp, maLsp, tenLsp, trangThai) =>
  custom.put(`/loai-sp/update`, { idLoaisp, maLsp, tenLsp, trangThai });

export { fetchAllLSP, fetchLSP, detailLSP, postAddLoaiSP, deleteLoaiSP, putUpdateLoaiSP };
