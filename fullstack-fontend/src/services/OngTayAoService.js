import custom from "./custom-axios";
const fetchAllTayAo = (page) => {
  return custom.get(`/ong-tay-ao/view-all?p=${page}`); // Call API
};

const fetchTayAo = () => {
  return custom.get(`/ong-tay-ao/listTayAo`); // Call API
};

const detailTayAo = (idTayAo) => {
  return custom.get(`/ong-tay-ao/detail/${idTayAo}`); // Call API
};

const postAddOngTayAo = (maTayAo, loaiTayAo, trangThai) => {
  return custom.post("/ong-tay-ao/add", { maTayAo, loaiTayAo, trangThai });
};
const deleteOngTayAo = (id) => {
  return custom.delete(`/ong-tay-ao/delete/${id}`);
};

const putUpdateOngTayAo = (idTayAo, maTayAo, loaiTayAo, trangThai) => {
  return custom.put(`/ong-tay-ao/update`, {
    idTayAo,
    maTayAo,
    loaiTayAo,
    trangThai,
  });
};

export {
  fetchAllTayAo,
  fetchTayAo,
  detailTayAo,
  postAddOngTayAo,
  deleteOngTayAo,
  putUpdateOngTayAo,
};
