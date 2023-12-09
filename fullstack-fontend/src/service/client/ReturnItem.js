import custom from '../custom-axios';

const returnItem = (update) => custom.put(`/hoa-don-chi-tiet/return-item`, update);
export { returnItem };
