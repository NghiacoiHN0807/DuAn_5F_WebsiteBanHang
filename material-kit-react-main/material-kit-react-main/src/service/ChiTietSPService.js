import custom from './custom-axios';

const fetchAllCTSP = (page) => {
  custom.get(`/chi-tiet-san-pham/view-all?p=${page}`); // Call API
};

const findSizeById = (id) => custom.get(`chi-tiet-san-pham/select-ctsp-byId/${id}`); // Call API

const postAddCTSP = (idSp, idSize, soLuongTon, trangThai, soLuong) =>
  custom.post(`/chi-tiet-san-pham/add/${soLuong}`, {
    idSp,
    idSize,
    soLuongTon,
    trangThai,
  });

const deleteCTSP = (id) => custom.put(`/chi-tiet-san-pham/delete/${id}`);

const putUpdateCTSP = (idCtsp, idSize, idSp, soLuongTon, trangThai) =>
  custom.put(`/chi-tiet-san-pham/update`, {
    idCtsp,
    idSize,
    idSp,
    soLuongTon,
    trangThai,
  });

export { fetchAllCTSP, postAddCTSP, deleteCTSP, putUpdateCTSP, findSizeById };
