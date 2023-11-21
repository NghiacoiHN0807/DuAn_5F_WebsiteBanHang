import custom from './custom-axios';

const fetchAllCL = (page) => custom.get(`/chat-lieu/view-all?p=${page}`); // Call API

const fetchCL = () => custom.get(`/chat-lieu/listCL`); // Call API

const detailCL = (idCl) => custom.get(`/chat-lieu/detail/${idCl}`); // Call API

const postAddChatLieu = (maCl, tenCl, trangThai) => custom.post('/chat-lieu/add', { maCl, tenCl, trangThai });

const deleteChatLieu = (id) => custom.delete(`/chat-lieu/delete/${id}`);

const putUpdateChatLieu = (idCl, maCl, tenCl, trangThai) =>
  custom.put(`/chat-lieu/update`, { idCl, maCl, tenCl, trangThai });

export { fetchAllCL, fetchCL, detailCL, postAddChatLieu, deleteChatLieu, putUpdateChatLieu };
