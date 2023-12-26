import custom from './custom-axios';

const fetchAllMS = (page) => custom.get(`/mau-sac/view-all?p=${page}`); // Call API

const fetchMS = () => custom.get(`/mau-sac/listMS`); // Call API

const detailMS = (idMs) => custom.get(`/mau-sac/detail/${idMs}`); // Call API

const postAddMauSac = (maMs, tenMs, trangThai) => custom.post('/mau-sac/add', { maMs, tenMs, trangThai });

const deleteMauSac = (id) => custom.delete(`/mau-sac/delete/${id}`);

const putUpdateMauSac = (idMs, maMs, tenMs, trangThai) =>
  custom.put(`/mau-sac/update`, { idMs, maMs, tenMs, trangThai });

export { fetchAllMS, fetchMS, detailMS, postAddMauSac, deleteMauSac, putUpdateMauSac };
