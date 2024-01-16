import custom from '../custom-axios';

const returnItem = (update, status) =>
  custom.put('/hoa-don-chi-tiet/return-item', update, {
    params: {
      status,
    },
  });
const returnAllItem = (idHd, moTa, trangThai) =>
  custom.put(`/hoa-don/update-status/${idHd}?moTa=${moTa}`, {
    moTa,
    trangThai,
  });
export { returnItem, returnAllItem };
