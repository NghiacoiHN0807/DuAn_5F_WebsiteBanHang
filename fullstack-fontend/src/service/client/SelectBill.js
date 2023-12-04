import custom from '../custom-axios';

const viewAllHDByIDKH = (idKH, page) => custom.get(`/hoa-don-chi-tiet/view-allProduct/${idKH}?p=${page}`);
export { viewAllHDByIDKH };
