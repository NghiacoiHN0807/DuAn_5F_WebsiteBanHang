import custom from '../custom-axios';

const selectDiaChiByTK = (maTaiKhoan) => custom.get(`/dia-chi/tai-khoan/?m=${maTaiKhoan}`);
export { selectDiaChiByTK };
