import custom from './custom-axios';

const getAllOrderManagement = (page, keyword) =>
  custom.get(`/hoa-don/view-all-online-invoice?p=${page}&keyword=${keyword}`);

const getDetailOneHD = (idHd) => custom.get(`/lich-su-hoa-don/view-all/${idHd}`);

export { getAllOrderManagement, getDetailOneHD };
