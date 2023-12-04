import custom from './custom-axios';

const getAll = () => custom.get(`/coupons/api/get-all`);

const add = (coupon) => custom.post(`/coupons/api/add`, coupon);

const update = (id, coupon) => custom.put(`/coupons/api/update/${id}`, coupon);

const del = (id, trangThai) => custom.delete(`/coupons/api/delete/${id}/${trangThai}`);

const insertHd = (idHd, code) => custom.post(`/coupons/api/insert-hd?idHd=${idHd}&code=${code}`);

const detail = (id) => custom.get(`/coupons/api/detail/${id}`);

export {getAll, add, update, del, detail, insertHd}