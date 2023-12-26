import custom from './custom-axios';

const fetchAllTayAo = (page) => custom.get(`/ong-tay-ao/view-all?p=${page}`); // Call API

const fetchTayAo = () => custom.get(`/ong-tay-ao/listTayAo`); // Call API

const detailTayAo = (idTayAo) => custom.get(`/ong-tay-ao/detail/${idTayAo}`); // Call API

const postAddOngTayAo = (maTayAo, loaiTayAo, trangThai) =>
  custom.post('/ong-tay-ao/add', { maTayAo, loaiTayAo, trangThai });

const deleteOngTayAo = (id) => custom.delete(`/ong-tay-ao/delete/${id}`);

const putUpdateOngTayAo = (idTayAo, maTayAo, loaiTayAo, trangThai) =>
  custom.put(`/ong-tay-ao/update`, {
    idTayAo,
    maTayAo,
    loaiTayAo,
    trangThai,
  });

export { fetchAllTayAo, fetchTayAo, detailTayAo, postAddOngTayAo, deleteOngTayAo, putUpdateOngTayAo };
