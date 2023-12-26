import custom from './custom-axios';

const fetchAllSize = (page) => custom.get(`/size/view-all?p=${page}`); // Call API

const fetchSize = () => custom.get(`/size/listSize`); // Call API

const detailSize = (idSize) => custom.get(`/size/detail/${idSize}`); // Call API

const postAddSize = (maSize, tenSize, trangThai) => custom.post('/size/add', { maSize, tenSize, trangThai });

const deleteSize = (id) => custom.delete(`/size/delete/${id}`);

const putUpdateSize = (idSize, maSize, tenSize, trangThai) =>
  custom.put(`/size/update`, { idSize, maSize, tenSize, trangThai });

export { fetchAllSize, fetchSize, detailSize, postAddSize, deleteSize, putUpdateSize };
