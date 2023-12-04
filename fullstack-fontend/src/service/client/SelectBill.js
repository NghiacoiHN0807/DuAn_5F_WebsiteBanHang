import custom from '../custom-axios';

const viewAllHDByIDKH = (idKH) => custom.get(`/hoa-don-chi-tiet/view-allProduct/${idKH}`);
export { viewAllHDByIDKH };
