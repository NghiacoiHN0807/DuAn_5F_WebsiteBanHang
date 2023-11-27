import custom from './custom-axios';

const getAll = () => custom.get(`/coupons/api/get-all`);

const add = (coupon) => custom.post(`/coupons/api/add`, coupon);

const update = (id, coupon) => custom.put(`/coupons/api/update/${id}`, coupon);

const del = (id) => custom.delete(`/coupons/api/delete/${id}`);

const detail = (id) => custom.get(`/coupons/api/detail/${id}`);

export {getAll, add, update, del, detail}