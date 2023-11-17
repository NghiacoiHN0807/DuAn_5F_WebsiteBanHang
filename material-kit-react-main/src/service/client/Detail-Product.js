import custom from '../custom-axios';

const listImg = (idSp) => custom.get(`anh/listAnh/${idSp}`);

export { listImg };
