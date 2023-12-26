import custom from '../custom-axios';

// const viewAllHDByIDKH = (idKH, page) => custom.get(`/hoa-don-chi-tiet/view-allProduct/${idKH}?p=${page}`);
const viewAllHDByIDKH = (idKH) => custom.get(`/hoa-don/view-bill-idkh/${idKH}`);
export { viewAllHDByIDKH };
