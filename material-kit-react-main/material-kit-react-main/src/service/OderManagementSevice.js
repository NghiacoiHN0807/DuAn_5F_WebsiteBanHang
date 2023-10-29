import custom from './custom-axios';

const getAllOrderManagement = () => custom.get(`/hoa-don/view-all-online-invoice`);

const getDetailOneHD = (idHd) => custom.get(`/lich-su-hoa-don/view-all/${idHd}`);

export { getAllOrderManagement, getDetailOneHD };
