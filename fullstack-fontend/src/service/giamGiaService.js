import custom from './custom-axios';

const getAll = () => custom.get(`/giam-gia-chi-tiet/api/view-all`);

const detailGiamGia = (id) => custom.get(`/giam-gia/api/detail/${id}`);

const detailChiTietSanPham = (id) => custom.get(`/chi-tiet-san-pham/detail/${id}`);

const getCtspByIdSp = (id) => custom.get(`/chi-tiet-san-pham/select-ctsp-byid/${id}`);

const getAllByTrangThai = (pageNo, size, trangThai) =>
  custom.get(`/giam-gia-chi-tiet/api/views?page=${pageNo}&size=${size}&trangThai=${trangThai}`);

const search = (pageNo, size, value) =>
  custom.get(`/giam-gia-chi-tiet/api/search?page=${pageNo}&size=${size}&value=${value}`);

const filerDate = (pageNo, size, first, last) =>
  custom.get(`/giam-gia-chi-tiet/api/filter-date?page=${pageNo}&size=${size}&first=${first}&last=${last}`);

const getAllSanPham = () => custom.get(`/san-pham/minimage`);

const getDetailSanPhamById = (idGg) => custom.get(`/san-pham/minimage/${idGg}`);

const getSanPhamDetails = () => custom.get(`/san-pham/dto`);

const detail = (id) => custom.get(`/giam-gia-chi-tiet/api/detail/${id}`);

const findGiamctByIdgg = (idGg) => custom.get(`/giam-gia-chi-tiet/api/get-ggct-idgg/${idGg}`);

const remove = (id) => custom.delete(`/giam-gia-chi-tiet/api/remove/${id}`);

const add = (giamGiaChiTiet) => custom.post(`/giam-gia-chi-tiet/api/insert-dto`, giamGiaChiTiet);

const addGiamGia = (request) => custom.post(`/giam-gia/api/insert`, request);

const addLichSuGiamGia = (lsGiamGia) => custom.post(`/lich-su-giam-gia/api/insert`, lsGiamGia);

const update = (giamGiaChiTiet, id) => custom.put(`/giam-gia-chi-tiet/api/update-dto/${id}`, giamGiaChiTiet);

const updateGiamGia = (giamGia, id) => custom.put(`/giam-gia/api/update/${id}`, giamGia);

const getImgByIdSp = (idSp) => custom.get(`/images/select-byidSP?id=${idSp}`);

const getIdGiamGia = (id) => custom.get(`/giam-gia-chi-tiet/api/getidGiamGiaByIdggct/${id}`);

const removeAll = (ids) => custom.delete('/giam-gia-chi-tiet/api/remove-all', {
  data: ids,
  headers: {
    'Content-Type': 'application/json', // Make sure to set the content type
  },
});

export {
  getSanPhamDetails,
  getIdGiamGia,
  updateGiamGia,
  getImgByIdSp,
  getAll,
  detail,
  remove,
  add,
  update,
  addGiamGia,
  addLichSuGiamGia,
  getAllByTrangThai,
  search,
  filerDate,
  getAllSanPham,
  detailGiamGia,
  detailChiTietSanPham,
  getCtspByIdSp,
  getDetailSanPhamById,
  removeAll,
  findGiamctByIdgg
};
