import custom from "./custom-axios";
const fetchAllCL = (page) => {
  return custom.get(`/chat-lieu/view-all?p=${page}`); // Call API
};

const fetchCL = () => {
  return custom.get(`/chat-lieu/listCL`); // Call API
};

const detailCL = (idCl) => {
  return custom.get(`/chat-lieu/detail/${idCl}`); // Call API
};

const postAddChatLieu = (maCl, tenNuoc, trangThai) => {
  return custom.post("/chat-lieu/add", { maCl, tenNuoc, trangThai });
};
const deleteChatLieu = (id) => {
  return custom.delete(`/chat-lieu/delete/${id}`);
};

const putUpdateChatLieu = (idCl, maCl, tenNuoc, trangThai) => {
  return custom.put(`/chat-lieu/update`, { idCl, maCl, tenNuoc, trangThai });
};

export {
  fetchAllCL,
  fetchCL,
  detailCL,
  postAddChatLieu,
  deleteChatLieu,
  putUpdateChatLieu,
};
