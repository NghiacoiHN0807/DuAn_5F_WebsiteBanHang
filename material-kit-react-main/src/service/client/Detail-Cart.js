import custom from '../custom-axios';

const listProductOnCart = (idSp) => custom.get(`/gio-hang-chi-tiet/view-all/${idSp}`);

export { listProductOnCart };
