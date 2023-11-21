import custom from './custom-axios';

const fetchAnh = (idSp) => custom.get(`/anh/listAnh/${idSp}`); // Call API

const postAddAnh = (idSp, url, trangThai) => custom.post('/anh/add', { idSp, url, trangThai });

const deleteAnh = (id) => custom.delete(`/anh/delete/${id}`);

export { fetchAnh, postAddAnh, deleteAnh };
